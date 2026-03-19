import { Worker } from "bullmq";
import {
  COD_JOB_NAMES,
  getCodQueueConnection,
  QUEUE_NAME_COD,
} from "./cod-queue";

type Container = { resolve: (key: string) => unknown };

export function createCodWorker(container?: Container) {
  return new Worker(
    QUEUE_NAME_COD,
    async (job) => {
      const data = job.data as { orderId?: string; phone?: string; totalEgp?: number };

      if (container) {
        try {
          const whatsapp = container.resolve("whatsappService") as {
            sendCodConfirmation?: (orderId: string, phone: string) => Promise<void>;
            sendCodFollowUp?: (orderId: string, phone: string) => Promise<void>;
            handleAutoCancel?: (orderId: string) => Promise<void>;
            sendDeliveryReminder?: (orderId: string, phone: string) => Promise<void>;
            sendUgcRequest?: (orderId: string, phone: string) => Promise<void>;
            requestPhoneCall?: (orderId: string, phone: string) => Promise<void>;
          };
          const orderId = data.orderId ?? "";
          const phone = data.phone ?? "";

          switch (job.name) {
            case COD_JOB_NAMES.sendConfirmation:
              if (whatsapp.sendCodConfirmation) await whatsapp.sendCodConfirmation(orderId, phone);
              break;
            case COD_JOB_NAMES.sendFollowUp:
              if (whatsapp.sendCodFollowUp) await whatsapp.sendCodFollowUp(orderId, phone);
              break;
            case COD_JOB_NAMES.autoCancel:
              if (whatsapp.handleAutoCancel) await whatsapp.handleAutoCancel(orderId);
              break;
            case COD_JOB_NAMES.deliveryReminder:
              if (whatsapp.sendDeliveryReminder) await whatsapp.sendDeliveryReminder(orderId, phone);
              break;
            case COD_JOB_NAMES.ugcRequest:
              if (whatsapp.sendUgcRequest) await whatsapp.sendUgcRequest(orderId, phone);
              break;
            case COD_JOB_NAMES.requestPhoneCall:
              if (whatsapp.requestPhoneCall) await whatsapp.requestPhoneCall(orderId, phone);
              break;
            default:
              return { handled: false, name: job.name };
          }
          return { handled: true, name: job.name, data: job.data };
        } catch (err) {
          const logger = container.resolve("logger") as { error?: (msg: string, e?: unknown) => void };
          logger?.error?.("COD worker job error", err);
          throw err;
        }
      }

      switch (job.name) {
        case COD_JOB_NAMES.sendConfirmation:
        case COD_JOB_NAMES.sendFollowUp:
        case COD_JOB_NAMES.autoCancel:
        case COD_JOB_NAMES.deliveryReminder:
        case COD_JOB_NAMES.ugcRequest:
        case COD_JOB_NAMES.requestPhoneCall:
          return { handled: true, name: job.name, data: job.data };
        default:
          return { handled: false, name: job.name };
      }
    },
    {
      connection: getCodQueueConnection(),
    }
  );
}

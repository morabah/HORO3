import { Queue } from "bullmq";
import type { CodOrderMetadata, CodOrderStatus } from "./types";
import {
  COD_JOB_NAMES,
  getCodQueueConnection,
  QUEUE_NAME_COD,
} from "../../jobs/cod-queue";

export class CodService {
  private queue: Queue | null = null;

  private getQueue() {
    if (!this.queue) {
      this.queue = new Queue(QUEUE_NAME_COD, {
        connection: getCodQueueConnection(),
      });
    }

    return this.queue;
  }

  createMetadata(totalEgp: number): CodOrderMetadata {
    return {
      confirmation_deadline_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      high_value_confirmation_required: totalEgp > 900,
      rto_count: 0,
    };
  }

  async scheduleLifecycle(orderId: string, phone: string, totalEgp: number) {
    const queue = this.getQueue();

    await queue.add(
      COD_JOB_NAMES.sendConfirmation,
      { orderId, phone, totalEgp },
      { delay: 2 * 60 * 60 * 1000, jobId: `${orderId}:confirm` }
    );

    await queue.add(
      COD_JOB_NAMES.sendFollowUp,
      { orderId, phone },
      { delay: 12 * 60 * 60 * 1000, jobId: `${orderId}:followup` }
    );

    await queue.add(
      COD_JOB_NAMES.autoCancel,
      { orderId },
      { delay: 24 * 60 * 60 * 1000, jobId: `${orderId}:autocancel` }
    );

    if (totalEgp > 900) {
      await queue.add(
        COD_JOB_NAMES.requestPhoneCall,
        { orderId, phone, totalEgp },
        { delay: 15 * 60 * 1000, jobId: `${orderId}:phone-call` }
      );
    }
  }

  nextStatus(current: CodOrderStatus, event: string): CodOrderStatus {
    const transitions: Record<CodOrderStatus, Record<string, CodOrderStatus>> = {
      pending_confirmation: {
        confirmed: "confirmed",
        cancelled: "cancelled",
        rto: "rto",
      },
      confirmed: {
        preparing: "preparing",
        cancelled: "cancelled",
      },
      preparing: {
        shipped: "shipped",
        cancelled: "cancelled",
      },
      shipped: {
        delivered: "delivered",
        rto: "rto",
      },
      delivered: {},
      rto: {},
      cancelled: {},
    };

    return transitions[current]?.[event] ?? current;
  }
}

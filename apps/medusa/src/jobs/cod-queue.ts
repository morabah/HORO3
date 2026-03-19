import type { JobsOptions } from "bullmq";

export const QUEUE_NAME_COD = "horo-cod-operations";

export const COD_JOB_NAMES = {
  sendConfirmation: "cod.send-confirmation",
  sendFollowUp: "cod.send-follow-up",
  autoCancel: "cod.auto-cancel",
  deliveryReminder: "cod.delivery-reminder",
  ugcRequest: "cod.ugc-request",
  requestPhoneCall: "cod.request-phone-call",
} as const;

export type CodJobName = (typeof COD_JOB_NAMES)[keyof typeof COD_JOB_NAMES];

export function getCodQueueConnection() {
  return {
    url: process.env.REDIS_URL,
  };
}

export function defaultCodJobOptions(): JobsOptions {
  return {
    attempts: 3,
    removeOnComplete: 500,
    removeOnFail: 500,
    backoff: {
      type: "exponential",
      delay: 30_000,
    },
  };
}

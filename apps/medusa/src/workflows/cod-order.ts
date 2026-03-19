import type { CodOrderMetadata, CodOrderStatus } from "../modules/cod/types";

export interface CodWorkflowInput {
  orderId: string;
  totalEgp: number;
}

export function createCodMetadata(input: CodWorkflowInput): CodOrderMetadata {
  const confirmationDeadline = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

  return {
    confirmation_deadline_at: confirmationDeadline,
    high_value_confirmation_required: input.totalEgp > 900,
    rto_count: 0,
  };
}

export function nextCodStatus(current: CodOrderStatus, event: string): CodOrderStatus {
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

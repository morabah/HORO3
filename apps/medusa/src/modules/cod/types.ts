export type CodOrderStatus =
  | "pending_confirmation"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "delivered"
  | "rto"
  | "cancelled";

export interface CodOrderMetadata {
  confirmation_deadline_at?: string;
  high_value_confirmation_required?: boolean;
  rto_reason?: string;
  rto_count?: number;
  exchange_reason?: string;
}

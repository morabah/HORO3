export interface PaymobTransactionPayload {
  orderId: string | number | null;
  paymentId: string | number | null;
  success?: boolean;
  amountCents?: string | number | null;
  raw: Record<string, unknown>;
}

export class PaymobService {
  createPaymentSession() {
    return {
      provider: "paymob",
      cardIntegrationId: process.env.PAYMOB_INTEGRATION_ID_CARD,
      walletIntegrationId: process.env.PAYMOB_INTEGRATION_ID_WALLET,
      codIntegrationId: process.env.PAYMOB_INTEGRATION_ID_COD,
    };
  }

  /**
   * Called when Paymob webhook confirms a successful transaction.
   * Wire to Medusa payment capture workflow (e.g. processPaymentWorkflow) for full integration.
   */
  async handleTransactionSuccess(payload: PaymobTransactionPayload): Promise<void> {
    const { orderId, success, raw } = payload;
    if (!success || orderId == null) return;
    const orderIdStr = String(orderId);
    // TODO: resolve and run processPaymentWorkflow or capturePayment for orderIdStr
    void orderIdStr;
    void raw;
  }
}

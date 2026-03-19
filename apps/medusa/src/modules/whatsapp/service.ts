export class WhatsappService {
  createConfirmationPayload(orderId: string, phone: string) {
    return {
      provider: "whatsapp",
      orderId,
      phone,
      verifyToken: process.env.WHATSAPP_VERIFY_TOKEN,
    };
  }

  /**
   * Send COD confirmation request (e.g. 2h after order). Wire to WhatsApp Cloud API when token is set.
   */
  async sendCodConfirmation(orderId: string, phone: string): Promise<void> {
    const token = process.env.WHATSAPP_TOKEN;
    if (!token || !phone) return;
    // TODO: call WhatsApp Cloud API to send template/message to phone for orderId
    void orderId;
  }

  /**
   * Send COD follow-up (e.g. 12h after order).
   */
  async sendCodFollowUp(orderId: string, phone: string): Promise<void> {
    const token = process.env.WHATSAPP_TOKEN;
    if (!token || !phone) return;
    void orderId;
  }

  /**
   * Mark order as auto-cancelled after 24h without confirmation. Resolve orderService and update status.
   */
  async handleAutoCancel(orderId: string): Promise<void> {
    void orderId;
    // TODO: resolve orderService, update order status to cancelled
  }

  /**
   * Send delivery reminder (e.g. when shipment is out for delivery).
   */
  async sendDeliveryReminder(orderId: string, phone: string): Promise<void> {
    if (!process.env.WHATSAPP_TOKEN || !phone) return;
    void orderId;
  }

  /**
   * Request UGC (review) after delivery.
   */
  async sendUgcRequest(orderId: string, phone: string): Promise<void> {
    if (!process.env.WHATSAPP_TOKEN || !phone) return;
    void orderId;
  }

  /**
   * Request phone call for high-value COD orders.
   */
  async requestPhoneCall(orderId: string, phone: string): Promise<void> {
    if (!process.env.WHATSAPP_TOKEN || !phone) return;
    void orderId;
  }
}

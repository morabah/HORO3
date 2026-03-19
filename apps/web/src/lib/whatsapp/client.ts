const API_BASE = "https://graph.facebook.com/v21.0";

function getCredentials() {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  return { token, phoneNumberId };
}

export async function sendWhatsAppTextMessage(to: string, body: string) {
  const { token, phoneNumberId } = getCredentials();
  if (!token || !phoneNumberId) {
    return { sent: false, reason: "WhatsApp Cloud API is not configured" };
  }

  try {
    const response = await fetch(`${API_BASE}/${phoneNumberId}/messages`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    });

    return {
      sent: response.ok,
      status: response.status,
    };
  } catch {
    return { sent: false, reason: "Failed to send WhatsApp message" };
  }
}

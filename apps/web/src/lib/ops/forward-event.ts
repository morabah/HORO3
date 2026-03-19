const MEDUSA_BACKEND =
  process.env.MEDUSA_BACKEND_URL ??
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

export async function forwardOperationalEvent(
  type: "paymob" | "bosta" | "whatsapp",
  payload: Record<string, unknown>
) {
  if (!MEDUSA_BACKEND) {
    return { forwarded: false, reason: "No Medusa backend configured" };
  }

  const url = `${MEDUSA_BACKEND.replace(/\/$/, "")}/admin/horo/hooks/${type}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.MEDUSA_API_KEY
          ? { Authorization: `Bearer ${process.env.MEDUSA_API_KEY}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    return {
      forwarded: response.ok,
      status: response.status,
      reason: response.ok ? undefined : `Backend responded with ${response.status}`,
    };
  } catch {
    return { forwarded: false, reason: "Backend forward failed" };
  }
}

import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  res.status(200).json({
    received: true,
    type: req.params?.type ?? "unknown",
    body: req.body,
  });
}

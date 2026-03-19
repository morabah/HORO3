# HORO Medusa v2 Backend

This workspace now contains a production-oriented scaffold for HORO operations:

- Egypt/EGP Medusa config entrypoint
- COD status contract and metadata fields
- Paymob, Bosta, WhatsApp, and COD module stubs
- BullMQ queue primitives for COD timing rules
- Admin hook endpoint contract used by the Next.js webhooks

## What is still required

1. Install Medusa dependencies inside `apps/medusa`.
2. Connect a real PostgreSQL database and Redis instance.
3. Replace the stub hook and queue handlers with Medusa order/payment/fulfillment mutations.
4. Add real outbound WhatsApp and courier service implementations.

## Expected webhook flow

The storefront forwards normalized events to:

```text
POST /admin/horo/hooks/paymob
POST /admin/horo/hooks/bosta
POST /admin/horo/hooks/whatsapp
```

These payloads are validated in `src/api/admin/horo/hooks/_lib.ts`.

## COD queue contract

Queue name:

```text
horo-cod-operations
```

Job names:

- `cod.send-confirmation`
- `cod.send-follow-up`
- `cod.auto-cancel`
- `cod.delivery-reminder`
- `cod.ugc-request`
- `cod.request-phone-call`

## Run

```bash
cd apps/medusa
npm install
npm run dev
```

Then point the storefront to the backend with:

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
MEDUSA_BACKEND_URL=http://localhost:9000
```

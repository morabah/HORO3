# Load testing (Phase 4)

Target: ~500 concurrent users (plan Section 10).

## Options

1. **k6** (recommended)
   ```bash
   brew install k6
   k6 run --vus 100 --duration 30s docs/load-test.js
   ```
   Create `docs/load-test.js` with HTTP requests to `/`, `/collections`, `/products/[handle]`.

2. **Artillery**
   ```bash
   npm install -g artillery
   artillery quick --count 500 --num 10 https://staging.horo.eg
   ```

3. **Vercel** – Use Vercel Analytics and speed insights; run load tests against staging (staging.horo.eg) before production.

## Key endpoints to hit

- `GET /` (home)
- `GET /ar` / `GET /en`
- `GET /ar/collections`
- `GET /ar/products/[handle]`
- `GET /api/health`

Fix bottlenecks (DB, external APIs, serverless cold starts) before soft launch.

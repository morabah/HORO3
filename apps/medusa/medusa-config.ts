import type { ConfigModule } from "@medusajs/framework/types";

const config: ConfigModule = {
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS ?? "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS ?? "http://localhost:3000",
      authCors: process.env.AUTH_CORS ?? "http://localhost:3000",
      jwtSecret: process.env.JWT_SECRET ?? "supersecret",
      cookieSecret: process.env.COOKIE_SECRET ?? "supersecret",
    },
  },
  modules: [
    { resolve: "./src/modules/cod", key: "codService" },
    { resolve: "./src/modules/paymob", key: "paymobService" },
    { resolve: "./src/modules/bosta", key: "bostaService" },
    { resolve: "./src/modules/whatsapp", key: "whatsappService" },
  ],
};

export default config;

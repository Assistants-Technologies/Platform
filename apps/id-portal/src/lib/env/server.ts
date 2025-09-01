import { z } from "zod";

export const serverEnv = z
  .object({
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    KRATOS_ADMIN_URL: z.url(),
    HYDRA_ADMIN_URL: z.url(),
  })
  .parse(process.env);

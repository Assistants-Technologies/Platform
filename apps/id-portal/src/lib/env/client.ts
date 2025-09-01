"use client"
import { z } from "zod"

const schema = z.object({
  NEXT_PUBLIC_KRATOS_URL: z.url(),
  NEXT_PUBLIC_HYDRA_URL: z.url(),
  NEXT_PUBLIC_APP_URL: z.url(),
})

export const clientEnv = schema.parse({
  NEXT_PUBLIC_KRATOS_URL: process.env.NEXT_PUBLIC_KRATOS_URL ?? "",
  NEXT_PUBLIC_HYDRA_URL: process.env.NEXT_PUBLIC_HYDRA_URL ?? "",
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "",
})

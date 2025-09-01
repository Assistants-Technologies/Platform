import { Configuration, FrontendApi } from "@ory/client";
import { clientEnv } from "../env/client";

/**
 * Ory Kratos client configured for frontend use
 */
export const ory = new FrontendApi(
  new Configuration({
    basePath: clientEnv.NEXT_PUBLIC_KRATOS_URL,
    baseOptions: {
      withCredentials: true,
    },
  }),
);

/**
 * Extracts status code and error data from Ory API responses
 */
export function extractError(err: any): { status: number; data: unknown } {
  const res = err?.response;
  if (res) return { status: res.status ?? 0, data: res.data };
  return {
    status: 0,
    data: { id: "unknown_error", message: String(err?.message || err) },
  };
}

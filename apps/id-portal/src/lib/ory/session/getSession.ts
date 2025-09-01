import type { Session, GenericError } from "@ory/client";
import { ory, extractError } from "../sdk";

export type GetSessionResult =
  | { ok: true; status: 200; data: Session }
  | { ok: false; status: number; error: GenericError };

export async function getSession(): Promise<GetSessionResult> {
  try {
    const { data } = await ory.toSession();
    return { ok: true, status: 200, data };
  } catch (err) {
    // Handle session not found or other errors
    const { status, data } = extractError(err);
    return { ok: false, status, error: data as GenericError };
  }
}

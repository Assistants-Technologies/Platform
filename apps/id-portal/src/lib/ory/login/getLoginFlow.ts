import { LoginFlow, GenericError } from "@ory/client";
import { ory, extractError } from "../sdk";

export type GetLoginFlowResult =
  | { ok: true; status: 200; data: LoginFlow; error?: never }
  | { ok: false; status: 403 | 404 | 410; error: GenericError; data?: never }
  | {
      ok: false;
      status: Exclude<number, 200 | 403 | 404 | 410>;
      error: GenericError;
      data?: never;
    };

export async function getLoginFlow(
  flowId: string,
): Promise<GetLoginFlowResult> {
  try {
    const { data } = await ory.getLoginFlow({ id: flowId });
    return { ok: true, status: 200, data };
  } catch (err: any) {
    const { status, data } = extractError(err);

    switch (status) {
      case 403:
      case 404:
      case 410:
        return { ok: false, status, error: data as GenericError };
      default:
        return {
          ok: false,
          status: status as Exclude<number, 200 | 403 | 404 | 410>,
          error: data as GenericError,
        };
    }
  }
}

import { GenericError, LogoutFlow } from "@ory/client";
import { ory, extractError } from "../sdk";

export type CreateBrowserLogoutFlowResult =
  | {
      ok: true;
      status: 200;
      data: LogoutFlow;
      error?: never;
      redirectTo?: never;
    }
  | { ok: false; status: 303; redirectTo: string; data?: never; error?: never }
  | {
      ok: false;
      status: Exclude<number, 200 | 303>;
      error: GenericError;
      data?: never;
      redirectTo?: never;
    };

export async function createBrowserLogoutFlow(
  returnTo?: string,
): Promise<CreateBrowserLogoutFlowResult> {
  try {
    const { data } = await ory.createBrowserLogoutFlow({
      returnTo: returnTo ?? `${process.env.NEXT_PUBLIC_APP_URL}/`,
    });

    return { ok: true, status: 200, data };
  } catch (err: any) {
    const { status, data } = extractError(err);

    switch (status) {
      case 303:
        if (err?.response?.headers?.location) {
          return {
            ok: false,
            status: 303,
            redirectTo: err.response.headers.location,
          };
        }
        return {
          ok: false,
          status: 303,
          error: data as GenericError,
        };
      default:
        return {
          ok: false,
          status: status as Exclude<number, 200 | 303>,
          error: data as GenericError,
        };
    }
  }
}

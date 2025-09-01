import { GenericError, RegistrationFlow } from "@ory/client";
import { ory, extractError } from "../sdk";

export type CreateBrowserLoginFlowResult =
  | {
      ok: true;
      status: 200;
      data: RegistrationFlow;
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

export async function createBrowserRegistrationFlow(): Promise<CreateBrowserLoginFlowResult> {
  try {
    const { data } = await ory.createBrowserRegistrationFlow({
      returnTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
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

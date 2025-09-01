import type { GenericError, SuccessfulNativeLogin, LoginFlow, ErrorBrowserLocationChangeRequired, UpdateLoginFlowBody } from "@ory/client";
import { ory, extractError } from "../sdk"

export type SubmitBrowserLoginFlowResult =
  | { ok: true; status: 200; data: SuccessfulNativeLogin }
  | { ok: false; status: 400; error: LoginFlow }
  | { ok: false; status: 410; error: GenericError }
  | { ok: false; status: 422; error: ErrorBrowserLocationChangeRequired }
  | { ok: false; status: 303; error: GenericError }
  | { ok: false; status: Exclude<number, 200 | 400 | 410 | 422 | 303>; error: GenericError }

export async function submitBrowserLoginFlow(
  flowId: string,
  body: UpdateLoginFlowBody
): Promise<SubmitBrowserLoginFlowResult> {
  try {
    const { data } = await ory.updateLoginFlow({
      flow: flowId,
      updateLoginFlowBody: body,
    })
    return { ok: true, status: 200, data: data as SuccessfulNativeLogin }
  } catch (err) {
    const { status, data } = extractError(err)
    switch (status) {
      case 400:
        return { ok: false, status, error: data as LoginFlow }
      case 410:
        return { ok: false, status, error: data as GenericError }
      case 422:
        return { ok: false, status, error: data as ErrorBrowserLocationChangeRequired }
      case 303:
        return { ok: false, status, error: data as GenericError }
      default:
        return { ok: false, status: status as Exclude<number, 200 | 400 | 410 | 422 | 303>, error: data as GenericError }
    }
  }
}
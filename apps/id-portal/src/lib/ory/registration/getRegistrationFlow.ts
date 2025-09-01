import { GenericError, RegistrationFlow } from "@ory/client"
import { ory, extractError } from "../sdk"

export type GetRegistrationFlowResult =
  | { ok: true; status: 200; data: RegistrationFlow; error?: never }
  | { ok: false; status: 303; redirectTo: string; data?: never; error?: never }
  | { ok: false; status: Exclude<number, 200 | 303>; error: GenericError; data?: never }

export async function getRegistrationFlow(flowId: string): Promise<GetRegistrationFlowResult> {
  try {
    const { data } = await ory.getRegistrationFlow({ id: flowId })
    return { ok: true, status: 200, data }
  } catch (err: any) {
    const { status, data } = extractError(err)

    switch (status) {
      case 303:
        return { ok: false, status, redirectTo: err.response.headers.location }
      default:
        return { ok: false, status: status as Exclude<number, 200 | 303>, error: data as GenericError }
    }
  }
}
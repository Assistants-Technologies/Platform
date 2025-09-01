import type { GenericError } from "@ory/client"

export type ApiResult<TData, TError = GenericError> =
  | { ok: true; status: 200; data: TData }
  | { ok: false; status: 303; redirectTo: string }
  | { ok: false; status: number; error: TError }

export function isSuccess<TData, TError = GenericError>(
  r: ApiResult<TData, TError>
): r is { ok: true; status: 200; data: TData } {
  return r.ok && r.status === 200
}

export function isRedirect<TData, TError = GenericError>(
  r: ApiResult<TData, TError>
): r is { ok: false; status: 303; redirectTo: string } {
  return !r.ok && r.status === 303
}

export function isError<TData, TError = GenericError>(
  r: ApiResult<TData, TError>
): r is { ok: false; status: number; error: TError } {
  return !r.ok && r.status !== 303
}
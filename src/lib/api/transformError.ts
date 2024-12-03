import { ApiError } from "./core";

export function transformError(errors: ApiError[]) {
  const out: Record<string, { message: string; type: string }> = {};
  for (const err of errors) {
    if (err.context) {
      out[err.context] = { ...err };
    }
  }

  return out;
}

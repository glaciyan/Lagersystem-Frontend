import { ApiError, ApiResult } from "./core";

export const match = <T>(
  result: ApiResult<T>,
  handlers: { ok: (data: T) => void; error: (error: ApiError[]) => void },
) => {
  if ("errors" in result && result.errors) {
    handlers.error(result.errors);
  }
  else if ("data" in result && result.data) {
    handlers.ok(result.data);
  }
  else {
    throw new Error("Invalid Result: both data and error are undefined.");
  }
};

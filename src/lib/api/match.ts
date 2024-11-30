import { ApiResult } from "./core";

export const match = <T, E>(
  result: ApiResult<T, E>,
  handlers: { ok: (data: T) => void; error: (error: E) => void },
) => {
  if ("error" in result && result.error) {
    handlers.error(result.error);
  }
  else if ("data" in result && result.data) {
    handlers.ok(result.data);
  }
  else {
    throw new Error("Invalid ApiResult: both data and error are undefined.");
  }
};

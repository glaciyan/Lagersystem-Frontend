import { ZodSchema } from "zod";
import { BASE_URL, BasicEndpoint, Body, Methods, Params, Path, Query, applyBody, applyQuery } from "./core";

export function endpoint<P extends Params = {}>(method: Methods, path: Path<P>): BasicEndpoint<{}, P, {}, {}> {
  return {
    method,
    path,
    base: BASE_URL,

    withQuery<QNew extends Query>() {
      return {
        ...this,
        applyQuery: (applyQuery<QNew>),
      };
    },

    withBody<BNew extends Body>() {
      return {
        ...this,
        applyBody: (applyBody<BNew>),
      };
    },

    returns<Z>(schema: ZodSchema<Z>) {
      return {
        ...this,
        returnSchema: schema,
      };
    },
  };
}

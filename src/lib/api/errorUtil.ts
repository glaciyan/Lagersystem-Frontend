import { z } from "zod";
import { ErrorSchema } from "./coreTypes";

type Error = z.infer<typeof ErrorSchema>;

// Helper function to construct errors dynamically
export function createErrors<T extends Record<string, Omit<Error, "type" | "context">>>(
  rawErrors: T,
): { [K in keyof T]: Error } {
  return Object.fromEntries(
    Object.entries(rawErrors).map(([key, value]) => [
      key,
      { ...value, type: key, context: "__fr_api" },
    ]),
  ) as { [K in keyof T]: Error };
}

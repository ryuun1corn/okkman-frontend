import { z } from "zod";

export const requestDataSchema = z.object({
  param: z
    .string()
    .optional()
    .refine((data) => data === undefined, {
      message: "Please input the data as a proper JSON",
    })
    .transform((data) => (data === undefined ? "null" : data)),
  data: z
    .string()
    .optional()
    .refine(
      (data) => {
        if (data === undefined) return true;
        try {
          JSON.parse(`{${data}}`);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Please input the data as a proper JSON" }
    )
    .transform((data) => JSON.parse(data === undefined ? "{}" : `{${data}}`)),
});

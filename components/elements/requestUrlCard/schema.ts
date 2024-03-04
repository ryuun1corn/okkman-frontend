import { z } from "zod";

export const requestDataSchema = z.object({
  endpoint: z.string(),
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

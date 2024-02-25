import { ZodIssue } from "zod";

export function handleZodErrors(errors: ZodIssue[]): string[] {
  let allErrors: string[] = [];
  errors.forEach(({ path, message }) => {
    allErrors.push(`${path[0]}: ${message}`);
  });

  return allErrors;
}

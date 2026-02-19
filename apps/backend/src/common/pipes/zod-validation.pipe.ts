import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import type { ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private readonly schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (result.success) {
      return result.data;
    }

    const fieldErrors = result.error.issues.reduce<Record<string, string[]>>((acc, issue) => {
      const key = issue.path.length > 0 ? issue.path.join(".") : "body";
      acc[key] = acc[key] ?? [];
      acc[key].push(issue.message);
      return acc;
    }, {});

    throw new BadRequestException({
      message: "Validation failed",
      code: "VALIDATION_ERROR",
      error: {
        fields: fieldErrors,
      },
    });
  }
}

import { Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class SanitizeInputPipe implements PipeTransform {
  transform(value: unknown) {
    return this.sanitizeValue(value);
  }

  private sanitizeValue(value: unknown): unknown {
    if (typeof value === "string") {
      return this.sanitizeString(value);
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.sanitizeValue(item));
    }

    if (value && typeof value === "object") {
      const sanitized: Record<string, unknown> = {};
      for (const [key, nestedValue] of Object.entries(value)) {
        sanitized[key] = this.sanitizeValue(nestedValue);
      }
      return sanitized;
    }

    return value;
  }

  private sanitizeString(input: string) {
    return input
      .replaceAll("\0", "")
      .trim()
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  }
}

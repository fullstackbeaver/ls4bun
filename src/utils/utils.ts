import DOMPurify from "isomorphic-dompurify";

export type Sanitizable = string | Array<unknown> | Record<string, unknown>;

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

/**
 * Recursively sanitizes the input to prevent XSS attacks.
 *
 * This function handles various types of input, including strings, arrays, and objects.
 * For strings, it uses `sanitizeString` to replace potentially dangerous characters
 * with their HTML entity counterparts. For arrays and objects, it recursively sanitizes
 * each element or property value.
 *
 * @param {Sanitizable} input - The input to sanitize, which can be of any type.
 *
 * @returns {Sanitizable} - The sanitized input, with potential XSS vulnerabilities mitigated.
 */
export function sanitizeInput(input: Sanitizable): Sanitizable {

  if (isString(input))      return DOMPurify.sanitize(input);

  if (Array.isArray(input)) return input.map((entry) => isString(entry) ? DOMPurify.sanitize(entry) : sanitizeInput(entry as Array<unknown> | Record<string, unknown>));

  if (typeof input === "object" && input !== null) {
    const sanitizedObject: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      sanitizedObject[DOMPurify.sanitize(key)] = sanitizeInput(value as Sanitizable);
    }
    return sanitizedObject;
  }
  return input;
}

/**
 * Sanitizes a string by replacing potentially dangerous characters with their HTML entity equivalents.
 *
 * This function is used to prevent XSS attacks by converting certain characters
 * that could be interpreted as HTML tags or script code into their safe HTML entity representations.
 *
 * @param {string} input - The string to be sanitized.
 *
 * @returns {string} - The sanitized string with HTML entity replacements.
 */
export function sanitizeString(input: string): string {
  return DOMPurify.sanitize(input);
}
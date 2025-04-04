import type { WorkRequest } from "server/httpServer_type";
import      { isString }    from "utils/utils";

/**
 * Recursively sanitizes the input to prevent XSS attacks.
 *
 * This function handles various types of input, including strings, arrays, and objects.
 * For strings, it uses `sanityzeString` to replace potentially dangerous characters
 * with their HTML entity counterparts. For arrays and objects, it recursively sanitizes
 * each element or property value.
 *
 * @param {unknown} input - The input to sanitize, which can be of any type.
 *
 * @returns {unknown} - The sanitized input, with potential XSS vulnerabilities mitigated.
 */

export function sanitizeInput(input: unknown): unknown { //export for tests
  if (isString( input ))      return sanityzeString(input);
  if (Array.isArray(input))   return input.map(sanitizeInput);
  if (typeof input === "object" && input !== null) {
    const sanitizedObject: { [key: string]: unknown } = {};
    for (const [key, value] of Object.entries(input)) {
      sanitizedObject[key] = sanitizeInput(value);
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
function sanityzeString(input: string): string {
  const replacements: { [key: string]: string } = {
    "\"": "&quot;",
    "&" : "&amp;",
    "'" : "&#39;",
    "/" : "&#x2F;",
    "<" : "&lt;",
    ">" : "&gt;"
  };

  return input.replace(/[&<>"'/]/g, (match) => replacements[match] ?? match);
}

export async function extractBody(request: WorkRequest): Promise<unknown> {
  if (
    request.method === "GET"     ||
    request.method === "DELETE"  ||
    request.method === "OPTIONS" ||
    !request.body
  ) return;

  const contentType         = request.headers.get("content-type");
  const expectedContentType = "application/json";

  if (!contentType?.includes(expectedContentType)) {
    throw new Error("400|Invalid content type. Expected "+expectedContentType);
  }

  request.body = sanitizeInput(await new Response(request.body).json());
}
export function isString(value: unknown): value is string {
  return typeof value === "string";
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

/**
 * Recursively sanitizes the input to prevent XSS attacks.
 *
 * This function handles various types of input, including strings, arrays, and objects.
 * For strings, it uses `sanitizeString` to replace potentially dangerous characters
 * with their HTML entity counterparts. For arrays and objects, it recursively sanitizes
 * each element or property value.
 *
 * @param {unknown} input - The input to sanitize, which can be of any type.
 *
 * @returns {unknown} - The sanitized input, with potential XSS vulnerabilities mitigated.
 */
export function sanitizeInput(input: unknown): unknown {

  if (isString( input ))      return sanitizeString(input);
  if (Array.isArray(input))   return input.map(sanitizeInput);
  if (typeof input === "object" && input !== null) {
    const sanitizedObject: { [key: string]: unknown } = {};
    for (const [key, value] of Object.entries(input)) {
      sanitizedObject[sanitizeString(key)] = sanitizeInput(value);
    }
    return sanitizedObject;
  }
  return input;
}
export declare function isString(value: unknown): value is string;
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
export declare function sanitizeString(input: string): string;
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
export declare function sanitizeInput(input: unknown): unknown;

import type { WorkRequest } from "server/httpServer_type";
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
export declare function sanitizeInput(input: unknown): unknown;
export declare function extractBody(request: WorkRequest): Promise<unknown>;

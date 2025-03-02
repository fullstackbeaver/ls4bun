/**
 * Extract parts from a URL path that are not part of the given path.
 *
 * The parts are returned as an array of strings.
 *
 * @param {string} url  - The URL to extract from.
 * @param {string} path - The path to remove from the URL.
 *
 * @returns {string[]} The extracted parts.
 */
export declare function extractFromPath(url: string, path: string): string[];

/**
 * Return an array of all files in a directory recursively.
 *
 * @param {string} folder - The path of the directory to traverse
 *
 * @returns {string[]} - An array of all found files
 *
 * @throws {Error} - If there is an error reading the directory
 *
 * @example
 * getFolderContent("/path/to/directory");
 * // => ["/path/to/directory/file1.txt", "/path/to/directory/file2.txt"]
 */
export declare function getFolderContent(folder: string): string[];

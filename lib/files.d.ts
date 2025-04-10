/**
 * Retrieves the content of a folder, returning an object with relative file paths.
 *
 * This function recursively traverses the specified folder, collects all file paths,
 * and returns an object containing an array of paths relative to the last folder in the path,
 * and the common path prefix.
 *
 * @param {string} folder - The path of the directory to retrieve content from.
 *
 * @returns {{ content: string[], start: string }} An object containing:
 * - content: An array of file paths relative to the last folder in the path.
 * - start: The common path prefix up to and including the last folder.
 *
 * @throws {Error} - If there is an error reading the directory.
 *
 * @example
 * getFolderContent("/path/to/directory");
 * // => { content: ["file1.txt", "subdir/file2.txt"], start: "/path/to/directory" }
 */
export declare function getFolderContent(folder: string): {
    content: string[];
    start: string;
};

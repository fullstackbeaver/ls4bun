import fs   from "node:fs";
import path from "node:path";

/**
 * Recursively traverse a directory and return an array of all files found.
 *
 * @param {string}    dirPath -          The path of the directory to traverse
 * @param {string[]} [arrayOfFiles=[]] - An array to store the found files
 *
 * @returns {string[]} - An array of all found files
 *
 * @example
 * getFolderContent("/path/to/directory");
 * // => ["/path/to/directory/file1.txt", "/path/to/directory/file2.txt"]
 */
function listAllFiles(dirPath:string, arrayOfFiles:string[]):string[] {
  const files = fs.readdirSync(dirPath);
  files.forEach((file:string) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = listAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });
  return arrayOfFiles;
}

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

export function getFolderContent(folder: string) {
  try {
    const result     = listAllFiles(folder, []) ;
    const lastFolder = folder.split("/").pop() as string;
    const start      = result[0].indexOf(lastFolder)+lastFolder.length;
    return {
      content: result.map((file) => file.slice(start)),
      start  : result[0].slice(0, start)
    };
  } catch (err) {
    const prefix = 500+"|";
    if (!(err instanceof Error)) {
      err = new Error(prefix + err);
    } else {
      err.message = prefix + err.message;
    }
    throw err;
  }
}
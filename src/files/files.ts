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
export function getFolderContent(folder: string) {
  try {
    return listAllFiles(folder, []) ;
  } catch (err) {
    console.error("Error reading folder:", err);
    throw err;
  }
}
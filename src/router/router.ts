import type { StaticRoutes }     from "./router_type";
import      { file }             from "bun";
import      { getFolderContent } from "../files/files";

/**
 * Add content of a folder as static route.
 *
 * @param {string} folder        - Path of the folder to add as static route
 * @param {string} [exposedPath] - Url path exposed for the folder. If not provided,
 *                                 the folder path will be used as is.
 *
 * @example
 * // Expose folder content of "public" at "/static"
 * await addStaticFolder("public", "/static");
 *
 * // Then, you can access to public/index.html at /static
 *
 * @returns {StaticRoutes} - An object containing the static routes
 */
export function addStaticFolder(folder: string, exposedPath?: string) {

  function reformatedUrl(file:string){
    if (file.endsWith(index)) file = file.replace(index, "");
    return exposedPath+file;
  }

  exposedPath ??= folder;
  if (exposedPath.endsWith("/")) exposedPath = exposedPath.slice(0, -1);
  const index              = "index.html";
  const { content, start } = getFolderContent(folder);
  const result             = {} as StaticRoutes;

  for (const file of content) {
    result[reformatedUrl(file)] = staticFile(start+file);
  };
  return result;
}

/**
 * Serve a file by buffering it in memory
 *
 * @param {string} file - Path of the file to serve
 *
 * @example
 * // Serve a file by buffering it in memory
 * "/favicon.ico": staticFile(__dirname+"/dist/favicon.ico"),
 *
 * @returns {Response} - A Response containing the file content
 */
export function staticFile(fileWithPath: string) {
  return () => new Response(file(fileWithPath));
}
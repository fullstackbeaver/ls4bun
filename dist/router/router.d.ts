import type { StaticRoutes } from "./router_type";
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
export declare function addStaticFolder(folder: string, exposedPath?: string): StaticRoutes;
/**
 * Serve a file by buffering it in memory
 *
 * @param {string} file - Path of the file to serve
 *
 * @example
 * // Serve a file by buffering it in memory
 * "/favicon.ico": async () => staticFile(__dirname+"/dist/favicon.ico"),
 *
 * @returns {Response} - A Response containing the file content
 */
export declare function staticFile(file: string): Promise<Response>;

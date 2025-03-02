import type { AddRouteArgs, StaticRoutes } from "./router_type";
/**
 * addFolderContent
 *
 * Add content of a folder as static route.
 *
 * @param {string} folder      - Path of the folder to add as static route
 * @param {string} pathExposed - Url path exposed for the folder
 *
 * @example
 * // Expose folder content of "public" at "/static"
 * await addFolderContent("public", "/static");
 *
 * // Then, you can access to public/index.html at /static
 */
export declare function addFolderContent(folder: string, pathExposed: string): Promise<void>;
/**
 * Add content of a folder as static route.
 *
 * @param {string} folder      - Path of the folder to add as static route
 * @param {string} [exposedPath] - Url path exposed for the folder. If not provided,
 *                                the folder path will be used as is.
 *
 * @example
 * // Expose folder content of "public" at "/static"
 * await addStaticFolder("public", "/static");
 *
 * // Then, you can access to public/index.html at /static
 *
 * @returns {StaticRoutes} - An object containing the static routes
 */
export declare function addStaticFolder(folder: string, exposedPath?: string): Promise<StaticRoutes>;
/**
 * Add an array of routes to the router.
 *
 * @param {AddRouteArgs[]} routes - An array of objects containing the route specifications.
 *                                  Each object must contain the following properties:
 *                                  - path: string | RegExp - The path of the route.
 *                                  - [method]: RouteSpec - An object containing the route
 *                                                        specification for the given method.
 *                                  - [method].handler: Function - The function to be called
 *                                                            when the route is matched.
 *                                  - [method].inputSchema: any - The schema of the input
 *                                                                 data for the route.
 *                                  - [method].outputSchema: any - The schema of the output
 *                                                                  data for the route.
 *                                  - [method].paramsRegex: RegExp - The regular expression
 *                                                                 used to extract the
 *                                                                 parameters from the path.
 *
 * @returns {Function[]} - An array of route functions.
 *
 * @example
 * const routes = [
 *   {
 *     path: "/users",
 *     [Method.GET]: {
 *       handler: (req) => {
 *         // Do something
 *       }
 *     }
 *   },
 *   {
 *     path: "/users/:id",
 *     [Method.GET]: {
 *       handler: (req) => {
 *         // Do something
 *       },
 *       paramsRegex: /\/users\/(\d+)/
 *     }
 *   }
 * ];
 *
 * const router = addRoutes(routes);
 */
export declare function addRoutes(routes: AddRouteArgs[]): Function[];

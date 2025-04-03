import type { AddRouteArgs, RouteSpec, StaticRoutes } from "./router_type";
import      { defineContentType, getFolderContent }   from "../dependencies/files";
import      { Method }                                from "./httpServer_constants";

const staticRoutes : StaticRoutes = {};

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
export async function addFolderContent(folder: string, pathExposed: string) {
  const list = getFolderContent(folder);
  for (const file of Object.keys(list as object)) {
    const src = file === "index.html"
      ? ""
      : file;
    staticRoutes["/"+pathExposed+src] = new Response(await Bun.file(folder+file).bytes(), {
      headers: {
        "Content-Type": defineContentType(file)
      },
    });
  };
}

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
export async function addStaticFolder(folder: string, exposedPath?: string) {

  function reformatedUrl(file:string){
    file = file.slice(folderLength);
    if (file.endsWith(index)) file = file.replace(index, "");
    return exposedPath+file;
  }

  if (exposedPath === undefined) exposedPath = folder;
  const folderLength = folder.length;
  const index        = "index.html";
  const list         = getFolderContent(folder);
  const result       = {} as StaticRoutes;

  for (const file of list) {
    result[reformatedUrl(file)] = new Response(await Bun.file(file).bytes(), {
      headers: {
        "Content-Type": defineContentType(file)
      },
    });
  };

  return result;
}

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
export function addRoutes(routes: AddRouteArgs[]) :Function[] { //reprendre ICI en utilisabt un seuk add route (ajouter boucle)
  const dynamicRoutes: Function[] = [];
  for (const route of routes) {
    dynamicRoutes.push ((routeToCheck: string, method: Method) => {
      const isAskedRoute =
        route.path instanceof RegExp
          ? route.path.test(routeToCheck)
          : route.path === routeToCheck;

      // ce n'est pas la bonne route
      if (!isAskedRoute) return false;

      // on vérifie la methode
      const { handler, inputSchema, outputSchema, paramsRegex } = route[method as "POST" | "GET" | "PUT" | "PATCH" | "DELETE"] as RouteSpec;
      if (!handler) throw new Error(`405|Method not allowed: ${routeToCheck}`);

      return {
        handler,
        inputSchema,
        outputSchema,
        params: paramsRegex
          ? 0 //TODO ajouter l'extraction des paramètres
          : undefined
      };
    });
  }
  return dynamicRoutes;
}
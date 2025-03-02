import type { DefineCustomsMethods, UpdatedRequest } from "./httpServer_type";
import type { Serve, Server }                        from "bun";

const customMethods         = {} as {[key: string]: Function};
const definedServerSettings = {} as Serve;
const middlewares           = [] as Function[];
const server                = {} as Server;

export async function useServer(serverSettings: Serve, methods?: DefineCustomsMethods) {
  if (methods) {
    for (const [method, information] of Object.entries(methods)) {
      customMethods[method] = information.action;
      information.useOnFirstStart && information.action();
    }
    Object.assign(definedServerSettings, serverSettings);
  }

  Object.assign(server, Bun.serve(serverSettings));
  console.log("server started!");
}

export async function reloadServer(args: string[]) {
  console.log("Reloading server...", args);
  for (const arg of args) {
    if (customMethods[arg]){
      customMethods[arg].constructor.name === "AsyncFunction"
        ? await customMethods[arg]()
        : customMethods[arg]();
    }
  }

  server.reload(definedServerSettings);
  console.log("Server reloaded");
}

export async function useDynamicRoutes(request: Request, routes: Function[]) {

  const req = {
    headers  : request.headers,
    method   : request.method,
    url      : request.url,
    urlObject: new URL(request.url)
  } as UpdatedRequest;
  if (request.body) req.extractedBody = await request.json();  //TODO securiser

  for (const route of routes) {
    const { handler, inputSchema, outputSchema, params } = route(req.url, req.method);

    if ( ! handler ) continue;

    for (const middleware of middlewares) {
      await middleware(req);
    }

    if (inputSchema) {
      // TODO remettre validation en entrée
      // const validate = ajv.compile(inputSchema);
      // if (!validate) throw new Error(`400|Bad request: ${routeToCheck}`);
    }

    if (params) req.params = params;

    const result = handler.constructor.name === "AsyncFunction"
      ? await handler(req)
      : handler(req);

    if (outputSchema) {
      //TODO remettre validation en sortie
    }

    return result;
  }

  throw new Error(`404|Not found: ${req.url}`);
}

export function useMiddleware(middleware: Function) {
  middlewares.push(middleware);
}
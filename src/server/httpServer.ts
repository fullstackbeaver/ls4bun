import type { BunRequest }         from "bun";
import type { RouteSpec }          from "../router/router_type";
import type { WorkingRequest }     from "../server/httpServer_type";
import      { extractRequestBody } from "security/secureBodyMiddleware";
import      { isValid }            from "suretype";
import      { makeResponse }       from "../response/response";

let middlewares:Function[] = [extractRequestBody];

export async function handleRoute(request: BunRequest, routeSpec: RouteSpec, responseFn = makeResponse) {

  const req = bunRequestToWorkingRequest(request);

  for (const middleware of middlewares) {
    await middleware(req);
  }

  const result = await runRoute(req, routeSpec);

  return responseFn(
    result.body,
    result.status,
    result.headers
  );
}

/**
 * Configure the list of middlewares to run before any route handler.
 * The first middleware in the list is always the extractRequestBody middleware and it is added automatically
 *
 * @param {Function[]} middlewaresList - The list of middlewares to run.
 */
export function useMiddlewares(middlewaresList: Function[]) {
  middlewares = [
    extractRequestBody,
    ...middlewaresList
  ];
}

/**
 * Run a route handler, checks the input and output of the handler using the suretype library
 *
 * @private This function is only exposed for testing purposes
 *
 * @param {WorkingRequest} request - The request object
 * @param {RouteSpec}      routeSpec - The route specification
 *
 * @returns {Promise<RouteAnswer>} - The result of the route handler
 *
 * @throws {Error} - If the input or output of the handler does not match the schema
 */
export async function runRoute(request: WorkingRequest, routeSpec: RouteSpec) {
  const { handler, inputSchema, outputSchema } = routeSpec;
  // console.log(request.body, inputSchema, isValid(inputSchema, request.body));
  if (inputSchema && !isValid(inputSchema, request.body)) throw new Error("400|wrong body data");
  // process.exit();

  const result = handler.constructor.name === "AsyncFunction"
    ? await handler(request)
    : handler(request);

  if (outputSchema && !isValid(outputSchema, result)) throw new Error("500|result is not as expected");

  return result;
}

/**
 * Creates a WorkingRequest object from a BunRequest object
 * @private This function is only exposed for testing purposes
 * @param {BunRequest} request The BunRequest object to convert
 *
 * @private This function is only exposed for testing purposes
 * @returns {WorkingRequest} A WorkingRequest object
 */
export function bunRequestToWorkingRequest(request:BunRequest){
  return {
    body   : request.body,
    context: {},
    headers: request.headers,
    params : request.params,
    result : {
      body: null,
    },
  };
}
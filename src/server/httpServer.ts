import type { Middlewares, WorkingRequest } from "../server/httpServer_type";
import type { BunRequest }                  from "bun";
import type { RouteSpec }                   from "../router/router_type";
import      { extractBody }                 from "security/secureBodyMiddleware";
import      { isValid }                     from "suretype";
import      { makeResponse }                from "../response/response";

const middlewares: Middlewares = {
  after : [],
  before: [extractBody]
};

/**
 * Run a route handler on a given request.
 *
 * @param {BunRequest} request      The request to be handled.
 * @param {RouteSpec}  routeSpec    The route specification.
 * @param {Function}   [responseFn] A function to build the response.
 *
 * @returns A Promise resolving to the handled response.
 */
export async function handleRoute(request: BunRequest, routeSpec: RouteSpec, responseFn = makeResponse) {

  const req = bunRequestToWorkingRequest(request);

  for (const middleware of middlewares.before as Function[]) {
    await middleware(req);
  }

  req.result = await runRoute(req, routeSpec);

  for (const middleware of middlewares.after as Function[]) {
    await middleware(req);
  }

  return responseFn(
    req.result.body,
    req.result.status,
    req.result.headers
  );
}

/**
 * Configure the list of middlewares to run before and after any route handler.
 *
 * @param {Middlewares} middlewaresList - The list of middlewares functions to run.
 */
export function useMiddlewares(middlewaresList: Middlewares) {
  if (middlewaresList.before) middlewares.before = middlewaresList.before;
  if (middlewaresList.after)  middlewares.after  = middlewaresList.after;
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

  if (inputSchema && !isValid(inputSchema, request.body)) throw new Error("400|wrong body data");

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
export function bunRequestToWorkingRequest(request:BunRequest): WorkingRequest {
  return {
    body   : request.body,
    context: {},
    headers: request.headers,
    params : request.params,
    result : {
      body: null
    },
  };
}
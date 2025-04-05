import type { Middlewares, ValidationFunction, WorkRequest } from "./httpServer_type";
import      { isString, sanitizeInput }                      from "utils/utils";
import type { BunRequest }                                   from "bun";
import type { RouteSpec }                                    from "../router/router_type";
import      { makeResponse }                                 from "../response/response";

const middlewares: Middlewares = {
  after : [],
  before: []
};

let validaton:ValidationFunction;

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

  const req = bunRequestToWorkRequest(request);

  for (const middleware of middlewares.before as Function[]) {
    await middleware(req);
  }

  req.result = await runRoute(req, routeSpec);

  for (const middleware of middlewares.after as Function[]) {
    await middleware(req);
  }

  return isString(req.result)
    ? responseFn(req.result)
    : responseFn(
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
 * @param {WorkRequest} request   - The request object
 * @param {RouteSpec}   routeSpec - The route specification
 *
 * @returns {Promise<RouteAnswer>} - The result of the route handler
 *
 * @throws {Error} - If the input or output of the handler does not match the schema
 */
export async function runRoute(request: WorkRequest, routeSpec: RouteSpec) {
  const { handler, inputSchema, outputSchema } = routeSpec;

  if (inputSchema && !validaton(inputSchema, request.body)) throw new Error("400|wrong body data");

  const result = handler.constructor.name === "AsyncFunction"
    ? await handler(request)
    : handler(request);

  if (outputSchema && !validaton(outputSchema, result)) throw new Error("500|result is not as expected");

  return result;
}

/**
 * Creates a WorkRequest object from a BunRequest object
 * @private This function is only exposed for testing purposes
 * @param {BunRequest} request The BunRequest object to convert
 *
 * @private This function is only exposed for testing purposes
 * @returns {WorkRequest} A WorkRequest object
 */
export function bunRequestToWorkRequest(request:BunRequest): WorkRequest {

  return {
    body   : extractBody(request),
    context: {},
    headers: request.headers,
    method : request.method as "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS",
    params : request.params,
    query  : (request?.url).includes("?")
      ? new URLSearchParams(request.url.split("?")[1])
      : null,
    result: {
      body: null
    },
    url: request.url
  };
}

export async function extractBody(request: BunRequest): Promise<Record<string, any> | null> { //exported for testing
  if (
    request.method === "GET"     ||
    request.method === "DELETE"  ||
    request.method === "OPTIONS" ||
    !request.body
  ) return null;

  const contentType = request.headers.get("content-type");

  if (contentType !== "application/json") throw new Error("400|Invalid content type. Expected application/json");

  try {
    return sanitizeInput(await JSON.parse(request.body.toString())) as Record<string, any>;
  } catch (e) { // eslint-disable-line no-unused-vars
    throw new Error("400|Invalid body");
  }
}

export function useValidator(validatorFn: ValidationFunction) {
  validaton = validatorFn;
}
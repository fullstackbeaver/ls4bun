import type { MiddlewareFunction, Middlewares, ValidationFunction, WorkRequest } from "./httpServer_type";
import type { BunRequest }                                                       from "bun";
import      { Method }                                                           from "./httpServer_constants";
import type { RouteSpec }                                                        from "../router/router_type";
import      { makeResponse }                                                     from "../response/response";
import      { sanitizeInput }                                                    from "utils/utils";

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

  middlewares.before && await runMiddlewares ( middlewares.before, req );

  const result = await runRoute(req, routeSpec);

  if (result.status ) req.result.status = result.status;
  if (result.headers) req.result.headers = {
    ...req.result.headers,
    ...result.headers
  };
  req.result.body = result.body ?? result;

  middlewares.after && await runMiddlewares ( middlewares.after, req );

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
export function useMiddlewares({ after, before }: Middlewares) {
  if (before) middlewares.before = before;
  if (after)  middlewares.after  = after;
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
export async function runRoute(request: WorkRequest,  { handler, inputSchema, outputSchema }: RouteSpec) {

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
function bunRequestToWorkRequest(request:BunRequest): WorkRequest {

  return {
    body   : extractBody(request),
    context: {},
    headers: request.headers,
    method : request.method as keyof typeof Method,
    params : request.params,
    query  : request.url.includes("?")
      ? new URLSearchParams(request.url.split("?")[1])
      : null,
    result: {
      body   : null,
      headers: new Headers()
    },
    url: request.url
  };
}

/**
 * Extracts and sanitizes the JSON body from a BunRequest object.
 *
 * @param {BunRequest} request - The BunRequest object to extract the body from.
 *
 * @returns {Promise<Record<string, any> | null>} A promise that resolves to the extracted and sanitized body as a record, or null if the request method is GET, DELETE, OPTIONS, or if there is no body.
 *
 * @throws {Error} Throws an error if the content type is not "application/json" or if the body cannot be parsed as JSON.
 */
export async function extractBody(request: BunRequest): Promise<Record<string, any> | null> { //exported for testing
  if (
    request.method === Method.GET     ||
    request.method === Method.DELETE  ||
    request.method === Method.OPTIONS ||
    !request.body
  ) return null;

  const contentType = request.headers.get("content-type");

  if (contentType !== "application/json") throw new Error("400|Invalid content type. Expected application/json");

  try {
    return sanitizeInput(await JSON.parse(request.body.toString())) as Record<string, any>;
  } catch (e) {
    throw new Error("400|Invalid body\n" + (e instanceof Error ? e.message : e));
  }
}

/**
 * Sets the validation function to be used for validating input and output schemas.
 *
 * @param {ValidationFunction} validatorFn - The function that performs validation.
 *
 * @returns {void}
 */
export function useValidator(validatorFn: ValidationFunction) {
  validaton = validatorFn;
}

/**
 * Runs an array of middlewares, passing the WorkRequest object to each one.
 *
 * @param {MiddlewareFunction[]} middlewares - The array of middlewares to run.
 * @param {WorkRequest}          wRequest    - The WorkRequest object to pass to each middleware.
 *
 * @returns {Promise<void>} - A promise that resolves when all middlewares have completed.
 */
async function runMiddlewares(middlewares:MiddlewareFunction[], wRequest:WorkRequest) {
  for (const middleware of middlewares) {
    // typeof middleware === "function" &&
    await middleware(wRequest);
  }
}
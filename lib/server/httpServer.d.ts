import type { Middlewares, ValidationFunction, WorkRequest } from "./httpServer_type";
import type { BunRequest } from "bun";
import type { RouteSpec } from "../router/router_type";
import { makeResponse } from "../response/response";
/**
 * Run a route handler on a given request.
 *
 * @param {BunRequest} request      The request to be handled.
 * @param {RouteSpec}  routeSpec    The route specification.
 * @param {Function}   [responseFn] A function to build the response.
 *
 * @returns A Promise resolving to the handled response.
 */
export declare function handleRoute(request: BunRequest, routeSpec: RouteSpec, responseFn?: typeof makeResponse): Promise<Response>;
/**
 * Configure the list of middlewares to run before and after any route handler.
 *
 * @param {Middlewares} middlewaresList - The list of middlewares functions to run.
 */
export declare function useMiddlewares(middlewaresList: Middlewares): void;
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
export declare function runRoute(request: WorkRequest, routeSpec: RouteSpec): Promise<any>;
/**
 * Creates a WorkRequest object from a BunRequest object
 * @private This function is only exposed for testing purposes
 * @param {BunRequest} request The BunRequest object to convert
 *
 * @private This function is only exposed for testing purposes
 * @returns {WorkRequest} A WorkRequest object
 */
export declare function bunRequestToWorkRequest(request: BunRequest): WorkRequest;
export declare function extractBody(request: BunRequest): Promise<Record<string, any> | null>;
export declare function useValidator(validatorFn: ValidationFunction): void;

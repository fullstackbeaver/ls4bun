import type { RouteAnswerBody } from "router/router_type";
/**
 * Builds a response object from a given body and status.
 *
 * @param   {{ status?: number, body: string|object }} options
*
 * @returns {Response}
 * @throws  {TypeError} If the body is not a string or an object.
 */
export declare function makeResponse(body: RouteAnswerBody, status: number, customHeaders?: {}): Response;

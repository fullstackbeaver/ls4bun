import type { RouteAnswerBody } from "router/router_type";
/**
 * Makes the response to send to client
 *
 * @param {RouteAnswerBody} body               the result to send
 * @param {number}          [status]           the status of the response 200 if not defined
 * @param {object}          [customHeaders]    the headers of the response, an empty object if not defined
 *
 * @returns {Response}
 */
export declare function makeResponse(body: RouteAnswerBody, status?: number, customHeaders?: {}): Response;

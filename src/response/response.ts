import type { RouteAnswerBody } from "router/router_type";
import      { isString }        from "../utils/utils";

/**
 * Makes the response to send to client
 *
 * @param {RouteAnswerBody} body               the result to send
 * @param {number}          [status]           the status of the response 200 if not defined
 * @param {object}          [customHeaders]    the headers of the response, an empty object if not defined
 *
 * @returns {Response}
 */
export function makeResponse( body:RouteAnswerBody, status = 200, customHeaders = {} ) {

  if (status >=300 && status < 400) return Response.redirect(body as string, status);

  const headers = new Headers();
  for (const [key, value] of Object.entries(customHeaders)) {
    headers.set(key, isString(value) ? value : `${value}`);
  }

  if (body === null)  return new Response("",{ headers, status });

  if (isString(body)) return new Response(body, { headers, status });

  return Response.json(body, { headers, status });
}
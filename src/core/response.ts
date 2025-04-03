import { ContentType } from "./httpServer_constants";

/**
 * Builds a response object from a given body and status.
 *
 * @param   {{ status?: number, body: string|object }} options
*
 * @returns {Response}
 * @throws  {TypeError} If the body is not a string or an object.
 */
export function makeResponse({ body, status=200 }:{status?: number, body: string|object|undefined}) {

  if (status >=300 && status < 400) return Response.redirect(body as string, status);

  const headers = new Headers();
  headers.set("status", status.toString());

  if (body === undefined) return new Response("",{ headers });

  return  typeof body === "string"
    ? new Response(`<pre>${body}</pre>`, {
      headers: {
        ...headers,
        "Content-Type": ContentType.HTML,
      }
    })
    : Response.json(body, {
      headers: {
        ...headers,
        "Content-Type": ContentType.JSON,
      }
    });
}
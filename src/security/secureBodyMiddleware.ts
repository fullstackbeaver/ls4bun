import type { WorkRequest } from "server/httpServer_type";
import      { isString }       from "utils/utils";

export function sanitizeInput(input: unknown): unknown { //export for tests
  if (isString( input ))      return sanityzeString(input);
  if (Array.isArray(input))   return input.map(sanitizeInput);
  if (typeof input === "object" && input !== null) {
    const sanitizedObject: { [key: string]: unknown } = {};
    for (const [key, value] of Object.entries(input)) {
      sanitizedObject[key] = sanitizeInput(value);
    }
    return sanitizedObject;
  }
  return input;
}

// function sanityzeString(input: string): string {
//   return input.replace(/[&<>"']/g, (match) => {
//     const replacements: { [key: string]: string } = {
//       "\"": "&quot;",
//       "&" : "&amp;",
//       "'" : "&#39;",
//       "<" : "&lt;",
//       ">" : "&gt;",
//     };
//     return replacements[match] ?? match;
//   });
// }

function sanityzeString(input: string): string {
  const replacements: { [key: string]: string } = {
    "\"": "&quot;",
    "&" : "&amp;",
    "'" : "&#39;",
    "/" : "&#x2F;",
    "<" : "&lt;",
    ">" : "&gt;"
  };

  return input.replace(/[&<>"'/]/g, (match) => replacements[match] ?? match);
}

export async function extractBody(request: WorkRequest): Promise<unknown> {
  if (
    request.method === "GET"     ||
    request.method === "DELETE"  ||
    request.method === "OPTIONS" ||
    !request.body
  ) return;

  const contentType         = request.headers.get("content-type");
  const expectedContentType = "application/json";

  if (!contentType || !contentType.includes(expectedContentType)) {
    throw new Error("400|Invalid content type. Expected "+expectedContentType);
  }

  request.body = sanitizeInput(await new Response(request.body).json());
}
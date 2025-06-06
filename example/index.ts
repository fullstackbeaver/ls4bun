import type { WorkRequest }    from "../lib";
import      { exampleRoutes }  from "./routes";
import      { useMiddlewares } from "../lib";

Bun.serve({
  error(error) {
    console.error(error);
    const [status, msg] = error.message.split("|");
    return new Response(msg, {
      headers: {
        "Content-Type": "text/html",
      },
      status: parseInt(status) ?? 500,
    });
  },
  port  : 4002,
  routes: exampleRoutes
});

useMiddlewares({

  after: [
    async (req:WorkRequest) => {
      req.result.headers.set("Cache-Control", "no-cache");
    }
  ],
  before: [
    async (req:WorkRequest) => {
      if (req.url.includes("/routeWithMiddleware") && req.headers?.get("authorization") !== "Bearer xxxxx") throw new Error("401|Unauthorized");
    }]
});

/*
if you want to use validator schema directly in routes, you need
to register a function that validates the schema like this one.
In this example, the library used is zod.
useValidator((schema: any, data: unknown) => {
  const result = schema.safeParse(data);
  return result.success;
});
*/
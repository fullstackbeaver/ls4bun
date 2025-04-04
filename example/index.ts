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
  before: [
    async (req:WorkRequest) => {
      if (req.url.includes("/routeWithMiddleware") && req.headers?.get("authorization") !== "Bearer xxxxx") throw new Error("401|Unauthorized");
    }]
});
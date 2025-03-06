import { Method, addStaticFolder, handleRoute, staticFile } from "../src"; //TODO switch to dist

const apiPath = "/api/v1";

export const routes = {
  // Per-HTTP method handlers
  [apiPath+"/posts"]: {
    [Method.GET] : () => new Response("List posts"),
    [Method.POST]: async req => {
      const body = await req.json();
      return Response.json({ created: true, ...body });
    },
  },
  [apiPath+"/routeWithMiddleware/:id"]: async req => handleRoute(req, {
    handler: async request => {
      return {
        body: `Hello User ${request.params.id}!`
      };
    },
    // inputSchema : {},
    // outputSchema: {}
  }),

  // Wildcard route for all routes that start with "/api/" and aren't otherwise matched
  [apiPath+"/*"]: Response.json({ message: "Not found" }, { status: 404 }),

  // Redirect from /blog/hello to /blog/hello/world
  "/blog/hello": Response.redirect("/blog/hello/world"),

  // Dynamic routes
  [apiPath+"/users/:id"]: req => new Response(`Hello User ${req.params.id}!`),

  // Static routes
  [apiPath + "/status"]: new Response("OK"),

  // serve folder content as static;
  ...addStaticFolder(__dirname+"/dist", ""),

  // Serve a file by buffering it in memory
  "/otherIcon.ico": async () => staticFile(__dirname+"/dist/favicon.ico")
};
import      { addStaticFolder, handleRoute } from "../lib";
import      { BunRequest }                   from "bun";
import type { WorkRequest }                  from "../lib";

const base = "/api/v1";

export const exampleRoutes = {
  [base+"/posts"]: (req:BunRequest) => handleRoute(req, {
    handler: () => {
      return "List posts";
    }
  }),
  [base+"/users/:id"]: (req:BunRequest) => { return handleRoute(req,{
    handler: (request: WorkRequest) => {
      return {
        body: "Hello User "+request.params.id+"!"
      };
    }
  }); },
  [base+"/routeWithMiddleware/:id"]: (req:BunRequest) => { return handleRoute(req,{
    handler: (request: WorkRequest) => {
      return "Hello User "+request.params.id+"!";
    }
  });},
  ...addStaticFolder(__dirname+"/dist", "/")
};
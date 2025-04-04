import type { WorkRequest } from "../src";

import { handleRoute } from "../src";

const base = "/api/v1";

export const exampleRoutes = {
  [base+"/posts"]: req => handleRoute(req, {
    handler: () => {
      return "List posts";
    }
  }),
  [base+"/users/:id"]: req => { return handleRoute(req,{
    handler: (request: WorkRequest) => {
      return {
        body: "Hello User "+request.params.id+"!"
      };
    }
  }); },
  [base+"/routeWithMiddleware/:id"]: req => { return handleRoute(req,{
    handler: (request: WorkRequest) => {
      return "Hello User "+request.params.id+"!";
    }
  });}
};
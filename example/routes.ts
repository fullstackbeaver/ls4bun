import      { Method, addStaticFolder, handleRoute, sanitizeString } from "../lib";
import type { BunRequest }                                           from "bun";
import type { WorkRequest }                                          from "../lib";

/* if you want to use the validator, of course you need to import your library. In following example it's `zod` */

const base = "/api/v1";

export const exampleRoutes = {
  [base+"/posts"]: (req:BunRequest) => handleRoute(req, {
    handler: () => "List posts"
  }),
  [base+"/users/:id"]: (req:BunRequest) => { return handleRoute(req,{
    handler: (request: WorkRequest) => {
      return {
        user: "Hello User "+request.params?.id+"!"
      };
    }
  }); },

  [base+"/routeWithMiddleware/:id"]: (req:BunRequest) => { return handleRoute(req,{
    handler: (request: WorkRequest) => {
      return "Hello User "+request.params?.id+"!";
    }
  });},

  [base+"/routeWithQuery"]: (req:BunRequest) =>  handleRoute(req,{
    handler: (request: WorkRequest) => {
      const query = sanitizeString(request.query?.get("foo") || "");
      return "ok "+query;
    }
  }),
  [base+"/add"]: {
    [Method.POST]: (req:BunRequest) =>  handleRoute(req,{
      handler: (request: WorkRequest) => {
        return request.body;
      },
      // inputSchema: z.object({
      //   contactInfo: z.object({
      //     email: z.string().email(),
      //     name : z.string(),
      //     phone: z.string().optional(),
      //   }),
      // })
    })
  },

  ...addStaticFolder(__dirname+"/dist", "/")
};

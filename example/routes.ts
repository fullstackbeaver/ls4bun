import      { addStaticFolder, handleRoute } from "../src";
import type { BunRequest }                   from "bun";
import type { WorkRequest }                  from "../lib";

/* if you want to use the validator, of course you need to import your library. In following example it's `zod` */

const base = "/api/v1";

export const exampleRoutes = {
  [base+"/posts"]: (req:BunRequest) => handleRoute(req, {
    handler: () => "List posts"
  }),
  [base+"/users/:id"]: (req:BunRequest) => { return handleRoute(req,{
    handler: (request: WorkRequest) => {
      return {
        body: "Hello User "+request.params?.id+"!"
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
      return "ok "+request.query?.get("foo");
    }
  }),

  /*
  example how to use validator for input (available also for output)
  [base+"/add"]: {
    [Method.POST]: (req:BunRequest) =>  handleRoute(req,{
      handler: (request: WorkRequest) => {
        return "ok";
      },
      inputSchema: z.object({
        contactInfo: z.object({
          email: z.string().email(),
          name : z.string(),
          phone: z.string().optional(),
        }),
      })
    }) },
  */

  ...addStaticFolder(__dirname+"/dist", "/")
};

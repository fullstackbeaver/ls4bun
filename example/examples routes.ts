import      { addRoutes, addStaticFolder }             from "../src/core/router";
import      { getPageContent, getPagesList, savePage } from "./core";
import      { Method }                                 from "../src";
import type { RouteAnswer }                            from "../src/core/router_type";
import type { UpdatedRequest }                         from "../src/core/httpServer_type";

const apiPath = "/api/v1";

export const dynamicRoutes = addRoutes([
  {
    path        : process.env.API_PATH + "/load",
    [Method.GET]: {
      handler: ({ urlObject }: UpdatedRequest): RouteAnswer => getPageContent(urlObject.search.slice(1))
    }
  },
  {
    path        : process.env.API_PATH + "/getPages",
    [Method.GET]: {
      handler: async () => getPagesList()
    }
  },
  {
    path         : process.env.API_PATH + "/savePage",
    [Method.POST]: {
      handler: (req: UpdatedRequest) => {
        savePage(req.extractedBody as object);
        return undefined;
      }
    }
  },
  {
    path        : "/preview/*",
    [Method.GET]: {
      handler: (req: UpdatedRequest) => {
        console.log(req);
        return undefined;
      }
    }
  }]);

export const staticRoutes = {
  //TODO add to swagger and bruno
  [apiPath + "/health"]: new Response("All good!"),                    // health-check endpoint
  // ...await addStaticFolder(__dirname+"/front/", ""),                                //interface d'admin
  // ...await addStaticFolder(process.cwd()+process.env.OUTPUT_FOLDER+assets, assets)  //assets
  ... await addStaticFolder(__dirname+"/dist", "")
};
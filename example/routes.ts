import      { Method, addRoutes, addStaticFolder }     from "../dist";
import type { RouteAnswer, UpdatedRequest }            from "../dist";
import      { getPageContent, getPagesList, savePage } from "./core";

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
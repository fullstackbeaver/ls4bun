import      { dynamicRoutes, staticRoutes }                                     from "./routes";
import      { useDefaultErrorHandler, useDynamicRoutes, useServer, useWatcher } from "../dist";
import type { UpdatedRequest }                                                  from "../dist";
import      { useMiddleware }                                                   from "../dist";

useServer(
  {
    error(error) {
      return useDefaultErrorHandler(error, this.development);
    },
    async fetch(request: Request) {
      return await useDynamicRoutes(request, dynamicRoutes);
    },
    port  : 4002,
    static: staticRoutes
  },
  { // methods to launch on server start or on reload
    css: {
      action         : () => {/* a function that compile CSS */ },
      useOnFirstStart: true
    }
  }
);

useWatcher(
  [__dirname+"/dist"],
  (filePath:string) => {
    const fnToCallOnReload = [] as string[];
    filePath.endsWith(".scss") && fnToCallOnReload.push("css");
    // it could have more rules, just fill the array with needed methods name
    return fnToCallOnReload;
  }
);

useMiddleware((request: UpdatedRequest) => {
  const errorMessage = "401|Unauthorized";
  const token        = request.headers.get("Authorization")?.replace("Bearer ", "") || "";
  if (token === "") throw new Error(errorMessage);
});
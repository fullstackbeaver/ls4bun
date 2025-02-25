import { dynamicRoutes, staticRoutes }                         from "./examples routes";
import { useDefaultErrorHandler, useDynamicRoutes, useServer } from "../src";
import { useWatcher }                                          from "../src/dependencies/watcher";

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
import type { WorkRequest }    from "../src";
import      { exampleRoutes }  from "./routes";
import      { useMiddlewares } from "../src";

// import { useWatcher }                                          from "../src/dependencies/watcher";

Bun.serve({
  error(error) {
    const [status, msg] = error.message.split("|");
    return new Response(msg, {
      headers: {
        "Content-Type": "text/html",
      },
      status: parseInt(status),
    });
  },
  port  : 4002,
  routes: exampleRoutes
});

// { // methods to launch on server start or on reload
//   css: {
//     action         : () => {/* a function that compile CSS */ },
//     useOnFirstStart: true
//   }
// }
// useWatcher(
//   [__dirname+"/dist"],
//   (filePath:string) => {
//     const fnToCallOnReload = [] as string[];
//     filePath.endsWith(".scss") && fnToCallOnReload.push("css");
//     // it could have more rules, just fill the array with needed methods name
//     return fnToCallOnReload;
//   }
// );

useMiddlewares({
  before: [
    async (req:WorkRequest) => {
      if (req.url.includes("/routeWithMiddleware") && req.headers?.get("authorization") !== "Bearer xxxxx") throw new Error("401|Unauthorized");
    }]
});
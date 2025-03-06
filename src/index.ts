export {
  Method
} from "./server/httpServer_constants";

export {
  handleRoute,
  useMiddlewares
} from "./server/httpServer";

export {
  addStaticFolder,
  staticFile
} from "./router/router";

export type {
  WorkingRequest
} from "./server/httpServer_type";

export type {
  RouteAnswer,
  RouteSpec,
  StaticRoutes
} from "./router/router_type";
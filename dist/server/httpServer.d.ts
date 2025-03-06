import type { RouteSpec } from "../router/router_type";
import { makeResponse } from "../response/response";
export declare function handleRoute(request: Request, routeSpec: RouteSpec, responseFn?: typeof makeResponse): Promise<void>;
export declare function useMiddlewares(middlewaresList: Function[]): void;

import type { DefineCustomsMethods } from "./httpServer_type";
import type { Serve } from "bun";
export declare function useServer(serverSettings: Serve, methods?: DefineCustomsMethods): Promise<void>;
export declare function reloadServer(args: string[]): Promise<void>;
export declare function useDynamicRoutes(request: Request, routes: Function[]): Promise<any>;
export declare function useMiddleware(middleware: Function): void;

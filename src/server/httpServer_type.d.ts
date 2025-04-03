import type { RouteAnswer } from "../router/router_type";

export type WorkingRequest = BunRequest & {
  context: Record<string, any>;  // Define context to be a more descriptive type if possible
  headers: Headers & {
    authorization?: string;
  };
  params?: Record<string, string>;
  result : RouteAnswer;
}

export type Middlewares = {
  after ?: Function[]
  before?: Function[]
}
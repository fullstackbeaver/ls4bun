import type { RouteAnswer } from "../router/router_type";

export type WorkingRequest = Request & {
  context: any                   //TODO change
  headers: Headers & {
    authorization?: string
  },
  params?: any                   //TODO change
  result : RouteAnswer
  // urlObject : URL

}
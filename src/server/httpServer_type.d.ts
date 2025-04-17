import      { Method }      from "./httpServer_constants";
import type { RouteAnswer } from "../router/router_type";

export type BodyExtracted = Record<string, any> | null

export type WorkRequest = {
  body   : Record<string, any> | null
  context: Record<string, any>  // Define context to be a more descriptive type if possible
  headers: Headers & {
    authorization?: string
  }
  method : keyof typeof Method
  params?: Record<string, string>
  query ?: URLSearchParams | null
  result : RouteAnswer
  url    : string
}

export type MiddlewareFunction = (req:WorkRequest) => Promise<void>;  // eslint-disable-line

export type Middlewares = {
  after ?: MiddlewareFunction[]
  before?: MiddlewareFunction[]
}

export type ValidationFunction = (schema: any, data: any) => boolean; // eslint-disable-line
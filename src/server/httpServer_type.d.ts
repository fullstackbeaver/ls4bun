import type { RouteAnswer } from "../../router/router_type";

export type WorkRequest = {
  body   : Record<string, any> | null
  context: Record<string, any>  // Define context to be a more descriptive type if possible
  headers: Headers & {
    authorization?: string
  }
  method : "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS"
  params?: Record<string, string>
  query ?: URLSearchParams | null
  result : RouteAnswer
  url    : string
}

export type Middlewares = {
  after ?: Function[]
  before?: Function[]
}

export type ValidationFunction = (schema: any, data: any) => boolean;
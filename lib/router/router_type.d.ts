import { Headers } from "bun";

export type RouteAnswer = {
  body    : RouteAnswerBody
  headers : Headers //Record<string, string>;
  status ?: number                  // useful for some variants of 200 like 206
}

export type RouteAnswerBody = string | object | null

export type RouteSpec = {
  handler      : Function
  inputSchema ?: any       //validator from suretype
  outputSchema?: any       //validator from suretype
}

export type StaticRoutes = {
  [key: string]: Function
}

// type Headers = {
//   get: (key: string) => string
//   set: (key: string, value: string) => void
// }
export type RouteAnswer = {
  body    : RouteAnswerBody
  headers : Headers
  status ?: number         // useful for some variants of 200 like 206
}

export type RouteAnswerBody = string | object | null

export type RouteSpec = {
  handler      : Function
  inputSchema ?: any       //validator from suretype
  outputSchema?: any       //validator from suretype
}

export type StaticRoutes = {
  [key: string]: () => Response
}
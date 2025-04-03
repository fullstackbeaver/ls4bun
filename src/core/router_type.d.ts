export type RouteAnswer = {
  body   : string | object
  status?: number           //usefull for some variants of 200 like 206
}

export type RouteSpec = {
  handler      : Function
  inputSchema ?: any       //TODO ajouter ajv car le schema d'entrée sera utile uniquement quand la validation sera en place
  outputSchema?: any       //TODO ajouter ajv car le schema de sortie sera utile uniquement quand la validation sera en place
  paramsRegex ?: RegExp
}

export type AddRouteArgs = {
  path   : string | RegExp
  GET   ?: RouteSpec
  POST  ?: RouteSpec
  DELETE?: RouteSpec
  PATCH ?: RouteSpec
  PUT   ?: RouteSpec
}

export type StaticRoutes = {
  [key: string]: Response
}
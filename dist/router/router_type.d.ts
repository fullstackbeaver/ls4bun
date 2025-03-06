export type RouteAnswer = {
  body    : RouteAnswerBody
  headers?: any              //TODO handle headers
  status  : number           //usefull for some variants of 200 like 206
}

export type RouteAnswerBody = string | object | null

export type RouteSpec = {
  handler      : Function
  inputSchema ?: any       //TODO ajouter ajv car le schema d'entrée sera utile uniquement quand la validation sera en place
  outputSchema?: any       //TODO ajouter ajv car le schema de sortie sera utile uniquement quand la validation sera en place
}

export type StaticRoutes = {
  [key: string]: Function
}
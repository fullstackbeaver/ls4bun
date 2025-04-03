export type UpdatedRequest = Request & {
  extractedBody?: object
  headers       : Headers & {
    authorization?: string
  }
  params   ?: any  //TODO change
  urlObject : URL

}

export type DefineCustomsMethods = {
  [key: string]: {
    action         : Function
    useOnFirstStart: boolean
  }
}
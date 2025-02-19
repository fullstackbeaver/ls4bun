import { makeResponse } from "../core/response";

export function useDefaultErrorHandler(error: any, isDev: boolean) {
  const { message, stack }      = error;
  const [errCode, msg, details] = message.split("|");

  console.error({ details, errCode, msg, stack });
  // TODO : ajouter un système d'enregistrement des logs
  return makeResponse({
    body  : isDev ? msg : { details, message: msg, stack },
    status: parseInt(errCode)
  });
}
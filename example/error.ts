import { makeResponse } from "../src/response/response";  // TODO switch to dist

export function useDefaultErrorHandler(error: any, isDev: boolean) {
  const { message, stack }      = error;
  const [errCode, msg, details] = message.split("|");

  console.error({ details, errCode, msg, stack });
  return makeResponse(
    isDev ? msg : { details, message: msg, stack }, // body
    parseInt(errCode)                               // status
  );
}
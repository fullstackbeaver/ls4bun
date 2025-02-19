// import type { DecodedAuthToken } from "@infra/keycloak/keycloack_types";
import type { UpdatedRequest }   from "./httpServer_type";
// import      { jwtDecode }        from "jwt-decode";

/**
 * Extract parts from a URL path that are not part of the given path.
 *
 * The parts are returned as an array of strings.
 *
 * @param {string} url  - The URL to extract from.
 * @param {string} path - The path to remove from the URL.
 *
 * @returns {string[]} The extracted parts.
 */
export function extractFromPath(url:string, path: string) {
  return url.replace(path, "").split("/");
}

// export function extractBearerToken(request: UpdatedRequest) {
//   const errorMessage = "401|Unauthorized";
//   const token        = request.headers.get("Authorization")?.replace("Bearer ", "") || "";
//   if (token === "") throw new Error(errorMessage);

//   const decodedToken = jwtDecode(token) as DecodedAuthToken;
//   // if (decodedToken.exp < Date.now() / 1000) throw new Error(errorMessage); //TODO remettre dès que débogage terminé
//   //TODO ajouter introspection du jeton

//   return decodedToken;
// }

// export function delay(ms: number): Promise<void> {
//   return new Promise(resolve => setTimeout(resolve, ms));
// }
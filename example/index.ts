import { Method, WorkingRequest, useMiddlewares } from "../src";    //TODO switch to dist
import { routes }                                 from "./routes";
import { useDefaultErrorHandler }                 from "./error";

Bun.serve(
  {
    error(error) {
      return useDefaultErrorHandler(error, this.development);
    },
    async fetch() {
      return new Response("Not Found", { status: 404 });
    },
    port: 4002,
    routes
  }
);

console.log("Listening on http://localhost:4002");

useMiddlewares([
  dummyAuthCheck,
  extractBody
]);

function dummyAuthCheck(request: WorkingRequest) {
  const token        = request.headers.get("Authorization")?.replace("Bearer ", "") || "";
  if (token === "") throw new Error("401|Unauthorized");
}

function extractBody(request: WorkingRequest) {
  if (request.method !== Method.POST && request.method !== Method.PUT && request.method !== Method.PATCH && request.body) {
    request.context.body = request.json();
  }
}

/*

ajouter les verifs de schema
deplacer dans des dossiers pour préparer les tests à venir

*/
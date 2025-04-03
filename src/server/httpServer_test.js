import { describe, expect, it, spyOn }           from "bun:test";
import { handleRoute, runRoute, useMiddlewares } from "./httpServer";
import { makeResponse as originalMakeResponse }  from "../response/response";
import { v as suretype}                          from "suretype"

useMiddlewares({
  before: [
    async (req) => {
      req.context.sum = 5;
    }],
  after: [
    async (req) => {
      req.result.body += (req.context.sum + 10);
    }]
});

const contentResult = {
  body: "Hello, World!",
  status: 599,
};

describe("handleRoute", () => {
  // test handle route, with middlewares and a custom status in response
  it("1. should run middlewares and route handler", async () => {
    const request   = { method: "GET", headers: {} };
    const routeSpec = {
      handler: () => contentResult
    };

    const makeResponseSpy = spyOn({ makeResponse: originalMakeResponse }, "makeResponse");

    await handleRoute(request, routeSpec, makeResponseSpy);

    expect(makeResponseSpy).toHaveBeenCalledWith("Hello, World!15", 599, undefined);
  });

  const request = { method: "POST", headers: {}, body: { foo: "bar" } };
  it("2. should check run normally if no inputSchema", async () => {
    const routeSpec = {
      handler: () => contentResult
    };
    const result = await runRoute(request, routeSpec);
    expect(result).toEqual(contentResult);
  });

  it("3. should check if input schema is valid", async () => {

    const routeSpec = {
      handler: () => contentResult,
      inputSchema: suretype.object( {
        foo: suretype.string( ).required( )
      })
    };
    const result = await runRoute(request, routeSpec);
    expect(result).toEqual(contentResult);
  });

  it("4. should reject if input schema is invalid", async () => {

    const routeSpec = {
      handler: () => contentResult,
      inputSchema: suretype.object( {
        foo: suretype.number( ).required( )
      })
    };
    await expect(runRoute(request, routeSpec)).rejects.toThrowError("400|wrong body data");
  });

  it("5. should check if output schema is valid", async () => {
    const routeSpec = {
      handler: () => contentResult,
      outputSchema: suretype.object( {
        body: suretype.string( ).required( ),
        status: suretype.number( ).required( )
      })
    };
    const result = await runRoute(request, routeSpec);
    expect(result).toEqual(contentResult);
  });

  it("6. should reject if output schema is invalid", async () => {

    const routeSpec = {
      handler: () => contentResult,
      outputSchema: suretype.object( {
        foo: suretype.number( ).required( )
      })
    };
    await expect(runRoute(request, routeSpec)).rejects.toThrowError("500|result is not as expected");
  });

});
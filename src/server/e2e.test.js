import { describe, it, expect } from "bun:test";

const base = "http://localhost:4002/api/v1";

describe("End-to-end tests", () => {
  const route1              = base+"/posts";
  const expedectedResponse1 = "List posts";
  it(title(route1, expedectedResponse1), async () => {
    const response = await fetch(route1);
    expect(await response.text()).toBe(expedectedResponse1);
  });

  const route2              = base+"/users/555";
  const expedectedResponse2 = {user:"Hello User 555!"};
  it(title(route2, expedectedResponse2), async () => {
    const response = await fetch(route2);
    expect(await response.json()).toEqual(expedectedResponse2);
  });

  const route3              = base+"/routeWithMiddleware/555";
  const expedectedResponse3 = "Hello User 555!";
  it(title(route3, expedectedResponse3), async () => {
    const response = await fetch(route3, {
      headers: {
        Authorization: "Bearer xxxxx",
      },
    });
    expect(await response.text()).toBe(expedectedResponse3);
  });

  const expedectedResponse4 = "Unauthorized";
  it(title(route3, expedectedResponse4)+" with no bearer to check middleware error", async () => {
    const response = await fetch(route3);
    expect(await response.text()).toBe(expedectedResponse4);
    expect(response.status).toBe(401);
  });

  const route5              = base+"/routeWithQuery?foo=bar";
  const expedectedResponse5 = "ok bar";
  it(title(route5, expedectedResponse5), async () => {
    const response = await fetch(route5);
    expect(await response.text()).toBe(expedectedResponse5);
  });


  const route6              = base+"/add";
  const expedectedResponse6 = {a:1,b:"c"};
  it(title(route6, expedectedResponse6), async () => {
  const result = await fetch(route6, {
      method: 'POST',
      headers: {
        'Accept'      : 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ a: 1, b: "c" })
    });
    const response = await result.json();
    console.log("---*",response);
    expect(response).toEqual(expedectedResponse6);
  });
});

/**
 * returns a string that can be used as a title for a test.
 * The returned string is of the form
 * "${route} should return "${expedectedResponse}"".
 *
 * @param {string} route The route that the request should be made to.
 * @param {string} expedectedResponse The expected response of the request.
 *
 * @returns {string} A string that can be used as a title for a test.
 */
function title(route, expedectedResponse) {
  return `${route} should return "${expedectedResponse}"`;
}
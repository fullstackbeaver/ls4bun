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
  const expedectedResponse2 = "Hello User 555!";
  it(title(route2, expedectedResponse2), async () => {
    const response = await fetch(route2);
    expect(await response.text()).toBe(expedectedResponse2);
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
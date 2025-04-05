import { extractBody }   from "./httpServer";
import { sanitizeInput } from "../utils/utils";

describe("secure body from request to avoid XSS injections", () => {
  it("1. extractBody should return null with a GET request", async () => {
    const request = new Request("https://example.com", { method: "GET" });
    expect(await extractBody(request)).toEqual(null);
  });

  it("2. extractBody should throw an error with a POST request without content-type", async () => {
    const request = new Request("https://example.com", { method: "POST", body: JSON.stringify({}) });
    await expect(extractBody(request)).rejects.toThrowError("400|Invalid content type. Expected application/json");
  });

  it("3. extractBody should throw an error with a POST request with a bad content-type", async () => {
    const request = new Request("https://example.com", { method: "POST", body: JSON.stringify({}), headers: { "content-type": "application/xml" } });
    await expect(extractBody(request)).rejects.toThrowError("400|Invalid content type. Expected application/json");
  });

  it("4. extractBody should return the body with a POST request with a good content-type", async () => {
    const result = await extractBody( {
      body   : JSON.stringify({ foo: "bar" }),
      headers: new Headers({ "content-type": "application/json" }),
      method : "POST",
      url    : "https://example.com"
    });
    expect(result).toEqual({ foo: "bar" });
  });

  it("5. should sanitize the input correctly", () => {
    const input = {
      "username": "<script>alert('XSS')</script>",
      "email": "test@example.com",
      "profile": {
        "firstName": "John",
        "lastName": "<strong>Doe</strong>",
        "address": {
          "city": "Paris",
          "zipCode": "75001"
        }
      },
      "hobbies": ["coding", "<script>alert('XSS')</script>", "reading"]
    };

    const expectedOutput = {
      username: "&lt;script&gt;alert(&#39;XSS&#39;)&lt;&#x2F;script&gt;",
      email   : "test@example.com",
      profile : {
        firstName: "John",
        lastName: "&lt;strong&gt;Doe&lt;&#x2F;strong&gt;",
        address  : {
          city   : "Paris",
          zipCode: "75001"
        }
      },
      hobbies: [
        "coding",
        "&lt;script&gt;alert(&#39;XSS&#39;)&lt;&#x2F;script&gt;",
        "reading"
      ]
    };

    expect(sanitizeInput(input)).toEqual(expectedOutput);
  });
});
import { extractBody }   from "./httpServer";
import { sanitizeInput } from "../utils/utils";

describe("secure body from request to avoid XSS injections", () => {
  it("1. extractBody should return null with a GET request", async () => {
    const request = new Request("https://example.com", { method: "GET" });
    expect(await extractBody(request)).toEqual(null);
  });

  it("2. extractBody should return the body with a POST request with a good content-type", async () => {
    const request = new Request("https://example.com", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body : JSON.stringify({ foo: "bar" })
    });

    const result = await extractBody(request);
    expect(result).toEqual({ foo: "bar" });
  });

  it("3. should sanitize the input correctly", () => {
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
      username: "",
      email   : "test@example.com",
      profile : {
        firstName: "John",
        lastName: "<strong>Doe</strong>",
        address  : {
          city   : "Paris",
          zipCode: "75001"
        }
      },
      hobbies: [
        "coding",
        "",
        "reading"
      ]
    };

    expect(sanitizeInput(input)).toEqual(expectedOutput);
  });
});
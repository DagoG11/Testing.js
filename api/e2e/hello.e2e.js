const request = require("supertest");

const createApp = require("../src/app");

describe("Test for hello endpoint", () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3001);
  });

  afterAll(async () => {
    await server.close();
  });

  describe("GET /", () => {
    test("should return a hello world message", async () => {
      const response = await request(app).get("/");
      console.log(
        "🚀 ~ file: hello.e2e.js:20 ~ test ~ response:",
        response.text,
      );
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello World!");
    });
  });
});

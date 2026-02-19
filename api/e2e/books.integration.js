const mockGetAll = jest.fn();

const request = require("supertest");


const createApp = require("../src/app");

const { generateManyBook } = require('../src/fakes/book.fake');



// Mockeamos la librería de Mongo
jest.mock('../src/lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => {},
})));

describe("Test for books", () => {
  let app = null;
  let server = null;
  beforeAll(() => {
    app = createApp();
    server = app.listen(3002);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('test for [GET]/api/v1/books', () => {
    test('should return the list books', async () => {
      // arrange
      const fakeBooks = generateManyBook(3);
      mockGetAll.mockResolvedValue(fakeBooks);
      // Act
      const response = await request(app).get('/api/v1/books');
      console.log(response);
      // Assert
      expect(response.body.length).toEqual(fakeBooks.length);
    });
  });
});
      


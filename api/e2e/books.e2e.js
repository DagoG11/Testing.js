const request = require('supertest');
const { MongoClient } = require('mongodb');

const { generateManyBook } = require('../src/app');
const { config } = require('../src/config');
const createApp = require("../src/app");

const DB_NAME = config.dbName;
const MONGO_URI = config.dbUrl;


let describe1 = describe('Test for books', () => {
  let app = null;
  let server = null;
  let database = null;
  let client = null;

  beforeAll(async () => {
    app = createApp();
    server = app.listen(3002);
    client = new MongoClient(MONGO_URI, {
      UseNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();
    database = client.db(DB_NAME);
  });

  afterAll(async () => {
    await server.close();
    await database.dropDatabase();
    await client.close();
  });

  beforeEach(async () => {
    await database.collection('books').deleteMany({});
  });

  describe('test for [GET]/api/v1/books', () => {
    test('should return the list books', async () => {
      // arrange
      const seedData = await database.collection('books').insertMany([
        {
          name: 'Book 1',
          year: 2020,
          author: 'Author 1',
        },
        {
          name: 'Book 2',
          year: 2021,
          author: 'Author 2',
        },
      ]);
      console.log(seedData);
      // Act
      return request(app)
        .get('/api/v1/books')
        .then(({ body }) => {
          console.log(body);
          // Assert
          expect(body.length).toEqual(seedData.insertedCount);
        });
    });
  });
});

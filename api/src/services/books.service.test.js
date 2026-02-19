const BooksService = require('./books.service');
const { generateManyBook } = require('../fakes/book.fake');

const mockGetAll = jest.fn();

// Mockeamos la librería de Mongo
jest.mock('../lib/mongo.lib', () => jest.fn().mockImplementation(() => ({
    getAll: mockGetAll,
    create: () => {},
})));

describe("Test for BooksService", () => {
    let service;
    
    beforeEach(() => {
        service = new BooksService();
        jest.clearAllMocks();
    });

    describe("Test for getBooks", () => {
        test("should return a list of books", async () => {
            // Arrange
            const FakeBooks = generateManyBook(20);
            mockGetAll.mockResolvedValue(FakeBooks);
            
            // Act
            const books = await service.getBooks();
            console.log(books); // Opcional
            
            // Assert
            expect(books.length).toEqual(FakeBooks.length);
            expect(mockGetAll).toHaveBeenCalled();
            expect(mockGetAll).toHaveBeenCalledTimes(1);
            expect(mockGetAll).toHaveBeenCalledWith('books', undefined);
        });

        test("should return the first book name correctly", async () => {
            // Arrange
            const FakeBooks = generateManyBook(4);
            mockGetAll.mockResolvedValue(FakeBooks);
            
            // Act
            const books = await service.getBooks();
            
            // Assert - CORREGIDO AQUÍ: books[0]
            expect(books[0].name).toEqual(FakeBooks[0].name);
        });
    });
});
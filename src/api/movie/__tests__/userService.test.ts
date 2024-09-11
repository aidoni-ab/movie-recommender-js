import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";

import type { Movie } from "@/api/movie/movieModel";
import { MovieRepository } from "@/api/movie/movieRepository";
import { MovieService } from "@/api/movie/movieService";

vi.mock("@/api/movie/movieRepository");

describe("movieService", () => {
  let movieServiceInstance: MovieService;
  let movieRepositoryInstance: MovieRepository;

  const mockMovies: Movie[] = [
    {
      id: 1,
      name: "Alice",
      email: "alice@example.com",
      age: 42,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "Bob",
      email: "bob@example.com",
      age: 21,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  beforeEach(() => {
    movieRepositoryInstance = new MovieRepository();
    movieServiceInstance = new MovieService(movieRepositoryInstance);
  });

  describe("findAll", () => {
    it("return all movies", async () => {
      // Arrange
      (movieRepositoryInstance.findAllAsync as Mock).mockReturnValue(mockMovies);

      // Act
      const result = await movieServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Movies found");
      expect(result.responseObject).toEqual(mockMovies);
    });

    it("returns a not found error for no movies found", async () => {
      // Arrange
      (movieRepositoryInstance.findAllAsync as Mock).mockReturnValue(null);

      // Act
      const result = await movieServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("No Movies found");
      expect(result.responseObject).toBeNull();
    });

    it("handles errors for findAllAsync", async () => {
      // Arrange
      (movieRepositoryInstance.findAllAsync as Mock).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await movieServiceInstance.findAll();

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while retrieving movies.");
      expect(result.responseObject).toBeNull();
    });
  });

  describe("findById", () => {
    it("returns a movie for a valid ID", async () => {
      // Arrange
      const testId = 1;
      const mockMovie = mockMovies.find((movie) => movie.id === testId);
      (movieRepositoryInstance.findByIdAsync as Mock).mockReturnValue(mockMovie);

      // Act
      const result = await movieServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.OK);
      expect(result.success).toBeTruthy();
      expect(result.message).equals("Movie found");
      expect(result.responseObject).toEqual(mockMovie);
    });

    it("handles errors for findByIdAsync", async () => {
      // Arrange
      const testId = 1;
      (movieRepositoryInstance.findByIdAsync as Mock).mockRejectedValue(new Error("Database error"));

      // Act
      const result = await movieServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("An error occurred while finding movie.");
      expect(result.responseObject).toBeNull();
    });

    it("returns a not found error for non-existent ID", async () => {
      // Arrange
      const testId = 1;
      (movieRepositoryInstance.findByIdAsync as Mock).mockReturnValue(null);

      // Act
      const result = await movieServiceInstance.findById(testId);

      // Assert
      expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(result.success).toBeFalsy();
      expect(result.message).equals("Movie not found");
      expect(result.responseObject).toBeNull();
    });
  });
});

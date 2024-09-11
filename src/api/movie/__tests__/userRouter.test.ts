import { StatusCodes } from "http-status-codes";
import request from "supertest";

import type { Movie } from "@/api/movie/movieModel";
import { movies } from "@/api/movie/movieRepository";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("Movie API Endpoints", () => {
  describe("GET /movies", () => {
    it("should return a list of movies", async () => {
      // Act
      const response = await request(app).get("/movies");
      const responseBody: ServiceResponse<Movie[]> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Movies found");
      expect(responseBody.responseObject.length).toEqual(movies.length);
      responseBody.responseObject.forEach((movie, index) => compareMovies(movies[index] as Movie, movie));
    });
  });

  describe("GET /movies/:id", () => {
    it("should return a movie for a valid ID", async () => {
      // Arrange
      const testId = 1;
      const expectedMovie = movies.find((movie) => movie.id === testId) as Movie;

      // Act
      const response = await request(app).get(`/movies/${testId}`);
      const responseBody: ServiceResponse<Movie> = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.OK);
      expect(responseBody.success).toBeTruthy();
      expect(responseBody.message).toContain("Movie found");
      if (!expectedMovie) throw new Error("Invalid test data: expectedMovie is undefined");
      compareMovies(expectedMovie, responseBody.responseObject);
    });

    it("should return a not found error for non-existent ID", async () => {
      // Arrange
      const testId = Number.MAX_SAFE_INTEGER;

      // Act
      const response = await request(app).get(`/movies/${testId}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Movie not found");
      expect(responseBody.responseObject).toBeNull();
    });

    it("should return a bad request for invalid ID format", async () => {
      // Act
      const invalidInput = "abc";
      const response = await request(app).get(`/movies/${invalidInput}`);
      const responseBody: ServiceResponse = response.body;

      // Assert
      expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
      expect(responseBody.success).toBeFalsy();
      expect(responseBody.message).toContain("Invalid input");
      expect(responseBody.responseObject).toBeNull();
    });
  });
});

function compareMovies(mockMovie: Movie, responseMovie: Movie) {
  if (!mockMovie || !responseMovie) {
    throw new Error("Invalid test data: mockMovie or responseMovie is undefined");
  }

  expect(responseMovie.id).toEqual(mockMovie.id);
  expect(responseMovie.name).toEqual(mockMovie.name);
  expect(responseMovie.email).toEqual(mockMovie.email);
  expect(responseMovie.age).toEqual(mockMovie.age);
  expect(new Date(responseMovie.createdAt)).toEqual(mockMovie.createdAt);
  expect(new Date(responseMovie.updatedAt)).toEqual(mockMovie.updatedAt);
}

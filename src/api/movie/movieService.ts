import { StatusCodes } from "http-status-codes";

import type { Movie } from "@/api/movie/movieModel";
import { MovieRepository } from "@/api/movie/movieRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class MovieService {
  private movieRepository: MovieRepository;

  constructor(repository: MovieRepository = new MovieRepository()) {
    this.movieRepository = repository;
  }

  // Retrieves all movies from the database
  async findAll(): Promise<ServiceResponse<Movie[] | null>> {
    try {
      const movies = await this.movieRepository.findAllAsync();
      if (!movies || movies.length === 0) {
        return ServiceResponse.failure("No Movies found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Movie[]>("Movies found", movies);
    } catch (ex) {
      const errorMessage = `Error finding all movies: $${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure(
        "An error occurred while retrieving movies.",
        null,
        StatusCodes.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // Retrieves a single movie by their ID
  async findById(id: number): Promise<ServiceResponse<Movie | null>> {
    try {
      const movie = await this.movieRepository.findByIdAsync(id);
      if (!movie) {
        return ServiceResponse.failure("Movie not found", null, StatusCodes.NOT_FOUND);
      }
      return ServiceResponse.success<Movie>("Movie found", movie);
    } catch (ex) {
      const errorMessage = `Error finding movie with id ${id}:, ${(ex as Error).message}`;
      logger.error(errorMessage);
      return ServiceResponse.failure("An error occurred while finding movie.", null, StatusCodes.INTERNAL_SERVER_ERROR);
    }
  }
}

export const movieService = new MovieService();

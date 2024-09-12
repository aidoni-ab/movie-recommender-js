import type { Movie } from "@/api/movie/movieModel";

export const movies: Movie[] = [
  {
    id: 1,
    name: "Some movie 1",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    id: 2,
    name: "Some movie 2",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
  {
    id: 3,
    name: "Some movie 3",
    createdAt: new Date(),
    updatedAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days later
  },
];

export class MovieRepository {
  async findAllAsync(): Promise<Movie[]> {
    return movies;
  }

  async findByIdAsync(id: number): Promise<Movie | null> {
    return movies.find((movie) => movie.id === id) || null;
  }

  async searchAsync(query: string): Promise<Movie[] | null> {
    return movies.filter((movie) => movie.name.includes(query));
  }
}

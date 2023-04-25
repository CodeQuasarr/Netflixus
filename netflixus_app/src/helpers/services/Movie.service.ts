import {MovieDetails, MovieDetailsWithGenre} from "@/helpers/types/MovieType";
import axiosInstance from "@/axios";
import {Helpers} from "@/helpers/index.service";

class MovieService {
    async getMoviesByQuery(query: string): Promise<MovieDetails> {
        const { data }: { data: MovieDetails } = await axiosInstance.get(
            `/search/movie?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR&include_adult=false&query=${query}`
        );
        return data;
    }

    async getMovieByGenders(): Promise<MovieDetailsWithGenre[]> {
        const allMoviesByGenres: MovieDetailsWithGenre[] = [];
        for (const genre of Helpers.genreList) {
            const { data }: { data: MovieDetails } = await axiosInstance.get(
                `/discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR&&page=${13}&with_genres=${genre.id}`
            );
            if (data.results) {
                allMoviesByGenres.push({
                    genre: genre.name,
                    results: data.results
                });
            }
        }
        return allMoviesByGenres;
    }
}

export default new MovieService();
// https://api.themoviedb.org/3/discover/movie?api_key=b8b3e66e9192eeaa12e7e90dd87d7dd2&page=100&with_genres=10402

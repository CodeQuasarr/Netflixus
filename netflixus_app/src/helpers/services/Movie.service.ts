import {MovieDetails, MovieDetailsWithGenre} from "@/helpers/types/MovieType";
import axiosInstance from "@/axios";
import {Helpers} from "@/helpers/index.service";

class MovieService {

    async getMoviesPoster(): Promise<MovieDetails[]> {
        const allMoviesByGenre: MovieDetails[] = [];
        for (const genre of Helpers.genreList) {
            const { data }: { data: MovieDetails } = await axiosInstance.get(
                `/discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR&&page=10&with_genres=${genre.id}`
            );
            allMoviesByGenre.push(data);
        }
        return allMoviesByGenre;
    }

    async getMovieByGenders(): Promise<MovieDetailsWithGenre[]> {
        const allMoviesByGenres: MovieDetailsWithGenre[] = [];
        for (const genre of Helpers.genreList) {
            const { data }: { data: MovieDetails } = await axiosInstance.get(
                `/discover/movie?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR&&page=${Math.floor(Math.random() * 8) + 10}&with_genres=${genre.id}`
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

import {MovieDetail, MovieDetails, MovieDetailsWithGenre, MovieVideo} from "@/helpers/types/MovieType";
import axiosInstance from "@/axios";
import {Helpers} from "@/helpers/index.service";

class MovieService {

    async getMoviesByGenre(currentPage = 1, genre:null|number = null, language: null|string = null, year: null|number = null,): Promise<MovieDetails> {
        const params = new URLSearchParams({
            api_key: process.env.VUE_APP_API_KEY,
            include_adult: 'false'
        });
        if (currentPage) { params.set('page', currentPage.toString()); }
        if (year) { params.set('year', year.toString()); }
        if (genre) { params.set('with_genres', genre.toString()); }
        if (language) { params.set('with_original_language', language); }
        const { data } = await axiosInstance.get(`/discover/movie?${params.toString()}`);
        return data;
    }

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

    async getMovieById(id: string): Promise<MovieDetail> {
        const { data }: { data: MovieDetail } = await axiosInstance.get(
            `/movie/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR`
        );
        return data;
    }

    async getMovieVideoKey(id: string): Promise<string> {
        const { data }: { data: MovieVideo } = await axiosInstance.get(
            `/movie/${id}/videos?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`
        );
        return data.results[0].key;
    }

    async getMovieCredits(id: string): Promise<string> {
        const { data }: { data: any } = await axiosInstance.get(
            `/movie/${id}/credits?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`
        );
        return data;
    }
}

export default new MovieService();
// https://api.themoviedb.org/3/discover/movie?api_key=b8b3e66e9192eeaa12e7e90dd87d7dd2&page=100&with_genres=10402

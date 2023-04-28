import {MovieCredits, MovieDetail, MovieDetails, MovieVideo} from "@/helpers/types/MovieType";
import axiosInstance from "@/axios";

class TvService {
    async getTvShowsByGenre(currentPage = 1, genre: null | number = null, language: null | string = null, year: null | number = null): Promise<MovieDetails> {
        const params = new URLSearchParams({
            api_key: process.env.VUE_APP_API_KEY,
            include_adult: 'false'
        });
        if (currentPage) {
            params.set('page', currentPage.toString());
        }
        if (year) {
            params.set('year', year.toString());
        }
        if (genre) {
            params.set('with_genres', genre.toString());
        }
        if (language) {
            params.set('with_original_language', language);
        }
        const {data} = await axiosInstance.get(`/discover/tv?${params.toString()}`);
        return data;
    }

    async getTvShowsByQuery(query: string): Promise<MovieDetails> {
        const {data}: { data: MovieDetails } = await axiosInstance.get(
            `/search/tv?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR&include_adult=false&query=${query}`
        );
        return data;
    }

    async getTvShowById(id: string): Promise<MovieDetail> {
        const {data}: { data: MovieDetail } = await axiosInstance.get(
            `/tv/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR`
        );
        return data;
    }

    async getTvShowVideoKey(id: string): Promise<string> {
        const {data}: { data: MovieVideo } = await axiosInstance.get(
            `/tv/${id}/videos?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`
        );
        return data.results[0].key;
    }

    async getTvShowCredits(id: string): Promise<MovieCredits> {
        const {data}: { data: MovieCredits } = await axiosInstance.get(
            `/tv/${id}/credits?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`
        );
        return data;
    }
}

export default new TvService();

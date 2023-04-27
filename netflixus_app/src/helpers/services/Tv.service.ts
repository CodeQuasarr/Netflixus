import {TvShowDetail, TvShowDetails, TvShowDetailsWithGenre} from "@/helpers/types/TvShowType";
import axiosInstance from "@/axios";
import {Helpers} from "@/helpers/index.service";

class TvService {
    async getTvShowsByGenre(currentPage = 1, genre: null | number = null, language: null | string = null, year: null | number = null): Promise<TvShowDetails> {
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

    async getTvShowsByQuery(query: string): Promise<TvShowDetails> {
        const {data}: { data: TvShowDetails } = await axiosInstance.get(
            `/search/tv?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR&include_adult=false&query=${query}`
        );
        return data;
    }

    async getTvShowById(id: string): Promise<TvShowDetail> {
        const {data}: { data: TvShowDetail } = await axiosInstance.get(
            `/tv/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR`
        );
        return data;
    }

    async getTvShowVideoKey(id: string): Promise<string> {
        const {data}: { data: TvShowDetails } = await axiosInstance.get(
            `/tv/${id}/videos?api_key=${process.env.VUE_APP_API_KEY}&language=en-US`
        );
        return "";
    }
}

export default new TvService();
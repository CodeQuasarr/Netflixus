import axiosInstance from "@/axios";
import {SearchMovie, SearchMovies, SearchPeopleMovie} from "@/helpers/types/MovieType";

class FilterService {

    /**
     * Search movies by query
     * @param query
     * @param currentPage
     */
    async searchMovies(query: string, currentPage = 1): Promise<SearchMovie[]> {
        const params = new URLSearchParams({
            api_key: process.env.VUE_APP_API_KEY,
            include_adult: 'false',
            query: query,
            page: currentPage.toString(),
        });
        const response = await axiosInstance.get(`/search/movie?${params.toString()}`);

        return response.data.results.map((result: SearchMovie) => ({
            id: result.id,
            poster_path: result.poster_path,
        }));
    }

    /**
     * Search tv movies by query
     * @param query
     * @param currentPage
     */
    async searchTvMovies(query: string, currentPage = 1): Promise<SearchMovie[]> {
        const params = new URLSearchParams({
            api_key: process.env.VUE_APP_API_KEY,
            include_adult: 'false',
            query: query,
            page: currentPage.toString(),
        });
        const response = await axiosInstance.get(`/search/tv?${params.toString()}`);

        return response.data.results.map((result: SearchMovie) => ({
            id: result.id,
            poster_path: result.poster_path,
        }));
    }

    /**
     * Search people movies by query
     * @param query
     * @param currentPage
     */
    async searchPeopleMovie(query: string, currentPage = 1): Promise<SearchMovie[]> {
        const params = new URLSearchParams({
            api_key: process.env.VUE_APP_API_KEY,
            include_adult: 'false',
            query: query,
            page: currentPage.toString(),
        });
        const response = await axiosInstance.get(`/search/person?${params.toString()}`);
        const movies: SearchMovie[] = [];
        response.data.results.forEach((result: SearchPeopleMovie) => {
            result.known_for.forEach((movie: SearchMovie) => {
                movies.push({
                    id: movie.id,
                    poster_path: movie.poster_path,
                });
            })
        });
        return movies;
    }

    /**
     * Search movies, tv movies and people movies by query
     * @param query
     * @param currentPage
     */
    async search(query: string, currentPage = 1): Promise<SearchMovies> {
        const movies: SearchMovies = {
            page: currentPage,
            results: [],
        }
        movies.results.push(...await this.searchMovies(query, currentPage));
        movies.results.push(...await this.searchTvMovies(query, currentPage));
        movies.results.push(...await this.searchPeopleMovie(query, currentPage));

        // Delete duplicates movies
        movies.results = movies.results.filter((movie, index, self) =>
                index === self.findIndex((m) => ( m.id === movie.id))
        );
        return movies;

    }
}
export default new FilterService();

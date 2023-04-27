import axiosInstance from "@/axios";
import {PeopleDetails} from "@/helpers/types/PeopleType";

class PeopleService {
    async getPeopleByQuery(query: string): Promise<PeopleDetails> {
        const { data }: { data: PeopleDetails } = await axiosInstance.get(
            `/search/person?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR&include_adult=false&query=${query}`
        );
        return data;
    }

    async getPeopleById(id: string): Promise<PeopleDetails> {
        const { data }: { data: PeopleDetails } = await axiosInstance.get(
            `/person/${id}?api_key=${process.env.VUE_APP_API_KEY}&language=fr-FR`
        );
        return data;
    }

    async getPopularPeople(currentPage = 1): Promise<PeopleDetails> {
        const params = new URLSearchParams({
            api_key: process.env.VUE_APP_API_KEY,
            include_adult: 'false'
        });
        if (currentPage) { params.set('page', currentPage.toString()); }
        const { data } = await axiosInstance.get(`/person/popular?${params.toString()}`);
        return data;
    }
}

export default new PeopleService();
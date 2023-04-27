export type PeopleDetails = {
    page?: number;
    results?: People[];
    total_pages?: number;
    total_results?: number;
}

export type People = {
    adult: boolean;
    id: number;
    known_for_department: string;
    name?: string;
    popularity: number;
    profile_path: string;
}
export type PeopleDetail = {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}
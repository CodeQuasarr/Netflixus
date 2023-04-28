export type Genre = {
    id: number;
    name: string;
    label?: string;
};

export type Poster = {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    name?: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime?: number;
    genres?: Genre[];
    hover?: boolean;
}

type ProductionCompany = {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

type spokenLanguages = {
    english_name: string;
    iso_639_1: string;
    name: string;
}

type BelongsToCollection = {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export type TvShowDetail = {
    adult: false,
    backdrop_path: string,
    belongs_to_collection: BelongsToCollection,
    created_by: {
        id: number,
        credit_id: string,
        name: string,
    }
    episode_run_time: number[],
    first_air_date: string,
    genres: Genre[],
    homepage: string,
    id: number,
    in_production: boolean,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: {
        air_date: string,
        episode_number: number,
        id: number,
        name: string,
        overview: string,
        production_code: string,
        season_number: number,
        still_path: string,
        vote_average: number,
        vote_count: number,

    }
    name: string,
    next_episode_to_air: null,
    networks: {
        name: string,
        id: number,
        logo_path: string,
        origin_country: string,

    }
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    original_language: string,
    original_name: string,
    overview: string,
    popularity: number,
    poster_path: string,
    production_companies: ProductionCompany[],
    production_countries: {
        iso_3166_1: string,
        name: string,
    }
    seasons: {
        air_date: string,
        episode_count: number,
        id: number,
        name: string,
        overview: string,
    }
    spoken_languages: spokenLanguages[],
    status: string,
    tagline: string,
    type: string,
    vote_average: number,
    vote_count: number,
    videos: {
        results: VideoDetails[]
    }
    release_date: string,
    credits: MovieCredits[],

}
export type MovieCredits = {
    cast: Cast[],
}

export type Cast = {
    adult: boolean,
    name: string,
    profile_path: string,
    cast_id: number,
}

export type TvShowDetails = {
    page?: number;
    results?: Poster[];
    total_pages?: number;
    total_results?: number;
}


export type TvShowDetailsWithGenre = {
    genre: string,
    results: Poster[];
}

type VideoDetails = {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;

}

export type TvShowVideo = {
    id: number,
    results: TvShowDetails[]
}
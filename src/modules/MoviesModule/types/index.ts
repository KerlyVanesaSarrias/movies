export interface Movie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: 'en' | 'es';
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MoviesListResponse {
    page: number;
    total_pages: number;
    total_results: number;
    results: Movie[];
}

export interface MovieDetail {
    id: number;
    genres: [];
    homepage: string;
    original_language: 'en' | 'es';
    title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: [];
    production_countries: [];
    release_date: string;
    spoken_languages: [];
}

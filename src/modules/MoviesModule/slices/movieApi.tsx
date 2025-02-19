import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieDetail, MoviesListResponse } from '../types';

const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDUwMGFmZGY1ZTkwZWI2ZjcwM2Y1MjE0OWMxOTE5ZSIsIm5iZiI6MTczOTg5NjIwMC44MTksInN1YiI6IjY3YjRiNTg4MGQ4N2I0ZGNjYjZkYTg4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wt6EzOLs8mMeI55vbscbSkfQW4XryV_iW9xy2A6m8XA';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3',
        prepareHeaders: (headers) => {
            headers.set('accept', 'application/json');
            headers.set('Authorization', `Bearer ${TOKEN}`);
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getMovies: builder.query<
            MoviesListResponse,
            {
                page: number;
                search?: string;
                genre?: string;
                releaseYear?: string;
                rating?: string;
            }
        >({
            query: ({ page, search, genre, releaseYear, rating }) => ({
                url: search ? '/search/movie' : '/discover/movie',
                params: {
                    page,
                    query: search || undefined,
                    with_genres: genre || undefined,
                    primary_release_year: releaseYear || undefined,
                    'vote_average.gte': rating ? Number(rating) : undefined,
                    sort_by: 'popularity.desc',
                    language: 'en-US',
                },
            }),
        }),

        getGenres: builder.query<
            { genres: { id: number; name: string }[] },
            void
        >({
            query: () => ({
                url: '/genre/movie/list',
                params: {
                    language: 'en-US',
                },
            }),
        }),

        getMovieDetail: builder.query<MovieDetail, unknown>({
            query: (movieId) => ({
                url: `/movie/${movieId}`,
                params: {
                    language: 'en-US',
                },
            }),
        }),
    }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieDetailQuery } =
    moviesApi;

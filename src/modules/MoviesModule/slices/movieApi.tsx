import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MoviesListResponse } from '../types';

const TOKEN =
    'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZDUwMGFmZGY1ZTkwZWI2ZjcwM2Y1MjE0OWMxOTE5ZSIsIm5iZiI6MTczOTg5NjIwMC44MTksInN1YiI6IjY3YjRiNTg4MGQ4N2I0ZGNjYjZkYTg4ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Wt6EzOLs8mMeI55vbscbSkfQW4XryV_iW9xy2A6m8XA';

export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3',
    }),
    endpoints: (builder) => ({
        getMovies: builder.query<MoviesListResponse, { page: number }>({
            query: ({ page }) => {
                return {
                    url: `/movie/popular`,
                    params: {
                        page,
                        language: 'en-US',
                    },
                    headers: {
                        accept: 'application/json',
                        Authorization: `Bearer ${TOKEN}`,
                    },
                };
            },
        }),
    }),
});

export const { useGetMoviesQuery } = moviesApi;

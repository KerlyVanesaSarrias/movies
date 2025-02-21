import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { MovieDetail, MoviesListResponse } from '../types';
import { getUserAuthenticatedLS } from '../../AuthModule/helpers/localStorageData';
import { toast } from 'react-toastify';

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
    tagTypes: ['Favorites'],
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
            query: ({ page, search, genre, releaseYear, rating }) => {
                const minRating = rating ? Number(rating) * 2 : undefined;
                const maxRating = minRating ? minRating + 1.9 : undefined;
                return {
                    url: search ? '/search/movie' : '/discover/movie',
                    params: {
                        page,
                        query: search || undefined,
                        with_genres: genre || undefined,
                        primary_release_year: releaseYear || undefined,
                        'vote_average.gte': minRating,
                        'vote_average.lte': maxRating,
                        language: 'en-US',
                        sort_by: 'popularity.desc',
                    },
                };
            },
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

        getFavorites: builder.query<MoviesListResponse, void>({
            query: () => {
                const user = getUserAuthenticatedLS();
                if (!user) {
                    toast.warning('User not authenticated');
                }
                return {
                    url: '/account/21826861/favorite/movies',
                    params: { language: 'en-US', api_key: TOKEN },
                };
            },
            providesTags: ['Favorites'],
        }),

        toggleFavorite: builder.mutation<
            void,
            { movieId: number; favorite: boolean }
        >({
            query: ({ movieId, favorite }) => {
                const user = getUserAuthenticatedLS();
                if (!user) {
                    toast.warning('You need login to view this page');
                }
                return {
                    url: `/account/${user?.email}/favorite`,
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: {
                        media_type: 'movie',
                        media_id: movieId,
                        favorite,
                    },
                    params: { api_key: TOKEN },
                };
            },
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;

                    dispatch(moviesApi.util.invalidateTags(['Favorites']));
                } catch (error) {
                    console.error(
                        'Error updating favorites in localStorage:',
                        error
                    );
                }
            },
        }),
    }),
});

export const {
    useGetMoviesQuery,
    useGetGenresQuery,
    useGetMovieDetailQuery,
    useGetFavoritesQuery,
    useToggleFavoriteMutation,
} = moviesApi;

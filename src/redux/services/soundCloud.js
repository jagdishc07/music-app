import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const soundCloudApi = createApi({
  reducerPath: 'soundCloudApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://soundcloud-scraper.p.rapidapi.com/v1',
    prepareHeaders: (headers) => {
      headers.set('X-RapidAPI-Key', import.meta.env['VITE_RAPID_API_KEY']);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getSongsBySearch: builder.query({
      query: (searchTerm) => `/search/tracks?term=${searchTerm}`,
      keepUnusedDataFor: 1800 // Cache the data for 10 minutes
    }),
    getSongTrack: builder.query({
      query: (track) => `/track/metadata?track=${encodeURIComponent(track)}`,
      keepUnusedDataFor: 1800 // Cache the data for 10 minutes
    })
  })
});

export const { useGetSongsBySearchQuery, useGetSongTrackQuery } = soundCloudApi;

// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/', 
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
      credentials: 'include', 
  }),
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => 'user/entry/',
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: 'login/',
        method: 'POST',
        body: credentials,
      }),
    }),
    addEntry: builder.mutation({
      query: (credentials) => ({
        url: 'user/entry/',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
})

export const { useGetProfileQuery, useLoginMutation,useAddEntryMutation } = apiSlice

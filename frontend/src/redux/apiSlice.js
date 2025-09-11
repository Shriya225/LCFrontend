// services/api.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const baseQuery = fetchBaseQuery({
  baseUrl: "http://127.0.0.1:8000",
  credentials: "include", // important for cookies
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// Wrapper that handles refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // access token expired → try refresh
    const refreshResult = await baseQuery(
      { url: "refresh/", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // save new access token
      api.dispatch({ type: "auth/setAccessToken", payload: refreshResult.data.access });

      // retry original query with new token
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed → logout
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
    endpoints: (builder) => ({
    getList: builder.query({
      query: (filters) => ({
    url: "user/list/",
    params: filters,  // only includes what user selected
  }),

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
});




export const { useGetListQuery, useLoginMutation,useAddEntryMutation } = apiSlice

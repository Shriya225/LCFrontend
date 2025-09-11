import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Base query
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

// Base query wrapper for refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    // token expired → try refresh
    const refreshResult = await baseQuery(
      { url: "refresh/", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data?.access) {
      // save new token
      api.dispatch({ type: "auth/setAccessToken", payload: refreshResult.data.access });

      // retry original query
      result = await baseQuery(args, api, extraOptions);
    } else {
      // refresh failed → logout
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};

// Api slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // list users with filters
    getList: builder.query({
      query: (filters) => ({
        url: "user/list/",
        params: filters, // only includes what user selected
      }),
    }),

    // login user
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),

    // add entry
    addEntry: builder.mutation({
      query: (credentials) => ({
        url: "user/entry/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

// Export hooks
export const {
  useGetListQuery,
  useLoginMutation,
  useAddEntryMutation,
} = apiSlice;

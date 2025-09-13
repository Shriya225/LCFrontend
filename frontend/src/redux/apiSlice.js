import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAccessToken, logout } from './authSlice';
// Base query
const baseQuery = fetchBaseQuery({
 baseUrl: import.meta.env.VITE_API_BASE_URL,
  // e.g., in axios instance or environment variable


  credentials: 'include',
  prepareHeaders: (headers, { endpoint, getState }) => {
    // Skip auth header for these public endpoints
    const publicEndpoints = ['home','login'];

    if (!publicEndpoints.includes(endpoint)) {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
  const refreshResult = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_API_BASE_URL,
      credentials: 'include',
      prepareHeaders: (headers) => {
        // Don't attach any auth header here
        return headers;
      },
    })({ url: 'refresh/', method: 'POST' }, api, extraOptions);
    if (refreshResult.data?.access) {
      api.dispatch(setAccessToken(refreshResult.data.access));
      result = await baseQuery(args, api, extraOptions);
    } else {
      // api.dispatch(logout());
      console.log("oops!! cant refersh....");
      
    }
  }

  return result;
};

// Api slice
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
   tagTypes: ["Dashboard"],
  endpoints: (builder) => ({
    // list users with filters
    getList: builder.query({
      query: (filters) => ({
        url: "user/list/",
        params: filters,
      }),
      providesTags: ["Dashboard"], 
    }),

    // login user
    login: builder.mutation({
      query: (credentials) => ({
        url: "login/",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation({
      query: (credentials) => ({
        url: "logout/",
        method: "POST",
        
      
      }),
    }),

    // add entry
    addEntry: builder.mutation({
      query: (credentials) => ({
        url: "user/entry/",
        method: "POST",
        body: credentials,
      }), 
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

// Export hooks
export const {
  useGetListQuery,
  useLoginMutation,
  useAddEntryMutation,useLogoutMutation
} = apiSlice;

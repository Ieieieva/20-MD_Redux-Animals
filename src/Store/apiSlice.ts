import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/animals',
  }),
  tagTypes: ['Animal'],
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: () => `/`,
      providesTags: ['Animal'],
    }),
    addNewAnimal: builder.mutation({
      query: (payload) => ({
        url: '',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [`Animal`],
    }),
    deleteAnimal: builder.mutation({
      query: (id) => ({
        url: '',
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: ['Animal'],
    }),
  }),
})

export const { useGetAnimalsQuery, useAddNewAnimalMutation, useDeleteAnimalMutation } = apiSlice
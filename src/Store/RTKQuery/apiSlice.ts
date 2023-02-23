import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000',
  }),
  tagTypes: ['Animal'],
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: () => `/animals`,
      providesTags: ['Animal'],
    }),
    addNewAnimal: builder.mutation({
      query: (payload) => ({
        url: `/animals`,
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: [`Animal`],
    }),
    deleteAnimal: builder.mutation({
      query: (id) => ({
        url: `animals/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
      invalidatesTags: [`Animal`],
    }),
  }),
})

export const { useGetAnimalsQuery, useAddNewAnimalMutation, useDeleteAnimalMutation } = apiSlice
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

//export slice to apiProvider
export const apiSlice = createApi({
    //folder name
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
    tagTypes: ["Todos"], //for invalidating cache
    endpoints: (builder) => ({   // case builder
        //get all todos
        getTodos: builder.query({ //request data
            query: () => "/todos",
            transformResponse: res => res.sort((a, b) => b.id - a.id), //change the shape of response before returning the data
            providesTags:["Todos"]
        }),

        // add one todo
        addTodo: builder.mutation({ //change data
            query: (todo) => ({
                url: '/todos',
                method: 'POST',
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),

        // edit todo
        updateTodo: builder.mutation({
            query: (todo) => ({
                url: `/todos/${todo.id}`,
                method: 'PATCH',
                body: todo
            }),
            invalidatesTags: ["Todos"]
        }),

        //delete todo
        deleteTodo: builder.mutation({
            query: ({ id }) => ({
                url: `/todos/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ["Todos"]
        }),

    })
})

//export methods to components
export const {
    useGetTodosQuery,
    useAddTodoMutation,
    useUpdateTodoMutation,
    useDeleteTodoMutation
} = apiSlice
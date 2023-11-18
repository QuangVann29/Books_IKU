import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook } from '../src/interfaces/book';

const bookApi = createApi({
  reducerPath: 'books',
  tagTypes: ['Books'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api',
  }),
  endpoints: (builder) => ({
    // Lấy danh sách sản phẩm
    getBooks: builder.query<IBook[], void>({
      query: (trashcan) => `/books?trashcan=${trashcan}`,
    }),
    getBook: builder.query<IBook, number | string>({
      query: (id) => `/books/${id}`,
      providesTags: ["Books"],
    }),
    // Thêm sản phẩm mới
    addBook: builder.mutation<IBook, IBook>({
      query: (newBook) => ({
        url: '/books',
        method: 'POST',
        body: newBook,
      }),
    }),

    // Cập nhật sản phẩm
    updateBook: builder.mutation<IBook, IBook>({
      query: (update) => {
        return {
          url: `books/${update._id}`, // Sử dụng `_id` trong đối tượng `update`
          method: 'PUT',
          body: update,
        };
      },
    }),

    // Xóa sản phẩm
    deleteBook: builder.mutation<void, string>({
      query: (bookId) => ({
        url: `books/${bookId}`,
        method: 'DELETE',
      }),
    }),
  }),
});
export const bookReducer = bookApi.reducer;
export const {
  useGetBooksQuery,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
} = bookApi;

export default bookApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IPlace, IPlaceToEditBody } from '@/utils/types/place/place.types';
import { IPlaceApiResponse } from '@/utils/types/place/place.types';
import { IGetMeApiResponse } from '@/utils/types/user/user.types';
import { IFood } from '@/utils/types/foods/food.interface';
import {
  IAddComment,
  IComment,
  ICommentApiResponse,
} from '@/utils/types/comments/comment.interfaces';
import { IOrdersApiReq, IOrdersApiRes } from '@/utils/types/order/order.types';
import transformImageUrl from '@/utils/common/transform-image-url';

// const baseUrl =
//   process.env.NODE_ENV !== 'production'
//     ? 'http://localhost:3000/api'
//     : `${process.env.NEXT_PUBLIC_PRODUCTION_DOMAIN}/api`;

const baseUrl = '/api';

export const foodsApi = createApi({
  reducerPath: 'foodsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Foods'],
  endpoints: (build) => {
    return {
      getFoods: build.query<IFood[], void>({
        query: () => `foods`,
        providesTags: ['Foods'],
      }),

      addFoods: build.mutation<IFood, IFood>({
        query(data) {
          return {
            url: `foods`,
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['Foods'],
      }),
    };
  },
});

export const likesApi = createApi({
  reducerPath: 'likesApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Likes'],
  endpoints: (build) => {
    return {
      addLike: build.mutation<
        string | undefined,
        { userEmail: string; foodName: string }
      >({
        query(data) {
          return {
            url: `foods/likes/${data.foodName}`,
            method: 'POST',
            body: data.userEmail,
          };
        },
        invalidatesTags: ['Likes'],
      }),
    };
  },
});

export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['Comment'],
  endpoints: (build) => {
    return {
      getComments: build.query<ICommentApiResponse[], string>({
        query: (foodSlug) => `foods/${foodSlug}/comments`,
        providesTags: ['Comment'],

        transformResponse: (response: ICommentApiResponse[], meta, arg) =>
          response.map((comment) => ({
            ...comment,
            user: {
              ...comment.user,
              image:
                comment.user?.image?.slice(7, comment.user?.image?.length) ||
                undefined,
            },
          })),
      }),

      addComment: build.mutation<ICommentApiResponse, IAddComment>({
        query(data) {
          const { foodSlug, ...body } = data;
          return {
            url: `foods/${foodSlug}/comments`,
            method: 'POST',
            body,
          };
        },
        invalidatesTags: ['Comment'],
      }),

      deleteComment: build.mutation<void, IComment>({
        query(data) {
          const { foodSlug } = data;
          return {
            url: `foods/${foodSlug}/comments`,
            method: 'DELETE',
            body: data,
          };
        },
        invalidatesTags: ['Comment'],
      }),

      editComment: build.mutation<void, IComment>({
        query(data) {
          const { foodSlug, ...body } = data;
          console.log(data);
          return {
            url: `foods/${foodSlug}/comments`,
            method: 'PATCH',
            body,
          };
        },
        invalidatesTags: ['Comment'],
      }),
    };
  },
});

export const userPlacesApi = createApi({
  reducerPath: 'userPlacesApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['UserPlaces'],
  endpoints: (build) => {
    return {
      getUserPlaces: build.query<IPlaceApiResponse[], void>({
        query: () => `users/places`,

        providesTags: ['UserPlaces'],
      }),

      addUserPlaces: build.mutation<IPlaceApiResponse, IPlace>({
        query(data) {
          return {
            url: `users/places`,
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['UserPlaces'],
      }),

      editUserPlaces: build.mutation<IPlaceApiResponse, IPlaceToEditBody>({
        query(data) {
          return {
            url: `users/places`,
            method: 'PATCH',
            body: data,
          };
        },
        invalidatesTags: ['UserPlaces'],
      }),

      deleteUserPlaces: build.mutation<{ message: string }, { id: string }>({
        query(data) {
          return {
            url: `users/places`,
            method: 'DELETE',
            body: data,
          };
        },
        invalidatesTags: ['UserPlaces'],
      }),
    };
  },
});

export const meApi = createApi({
  reducerPath: 'meApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['me'],
  endpoints: (build) => {
    return {
      getMe: build.query<IGetMeApiResponse, void>({
        query: () => `auth/me`,

        providesTags: ['me'],
        transformResponse: (
          { user, userPlaces }: IGetMeApiResponse,
          meta,
          arg
        ) => ({
          userPlaces,
          user: {
            ...user,
            image: transformImageUrl(user.image),
          },
        }),
      }),

      editUser: build.mutation<any, any>({
        query(data) {
          return {
            url: `auth/me`,
            method: 'PATCH',
            body: data,
          };
        },
        invalidatesTags: ['me'],
      }),
    };
  },
});

export const ordersApi = createApi({
  reducerPath: 'ordersApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ['UserOrder'],
  endpoints: (build) => {
    return {
      getOrders: build.query<
        {
          pagination: { count: number; pageCount: number };
          orders: IOrdersApiRes[];
        },
        { userId: string; page: number }
      >({
        query: ({ userId, page }) => `users/${userId}/orders?page=${page}`,
        providesTags: ['UserOrder'],
      }),

      addOrder: build.mutation<{ id: string }, IOrdersApiReq>({
        query(data) {
          return {
            url: `users/${data.userId}/orders`,
            method: 'POST',
            body: data,
          };
        },
        invalidatesTags: ['UserOrder'],
      }),
    };
  },
});

export const { useGetFoodsQuery } = foodsApi;

export const {
  useAddCommentMutation,
  useGetCommentsQuery,
  useDeleteCommentMutation,
  useEditCommentMutation,
} = commentsApi;

export const { useAddLikeMutation } = likesApi;

export const {
  useGetUserPlacesQuery,
  useAddUserPlacesMutation,
  useEditUserPlacesMutation,
  useDeleteUserPlacesMutation,
} = userPlacesApi;

export const { useGetMeQuery, useEditUserMutation } = meApi;

export const { useAddOrderMutation, useGetOrdersQuery } = ordersApi;

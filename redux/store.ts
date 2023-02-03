import { rtkQueryErrorLogger } from './features/error-middleware';
import { loadingBarSlice } from './features/loadingBarSlice';
import { configureStore } from '@reduxjs/toolkit';

import authReducer from '@/redux/features/authSlice';
import cartReducer from '@/redux/features/cartSlice';
import foodsReducer from '@/redux/features/foodsSlice';
import loadingBarReducer from '@/redux/features/loadingBarSlice';
import { authSlice } from './features/authSlice';
import { cartSlice } from '@/redux/features/cartSlice';
import { foodsSlice } from '@/redux/features/foodsSlice';
import {
  commentsApi,
  foodsApi,
  likesApi,
  meApi,
  userPlasesApi,
} from './features/apiSlice';

export const reducers = {
  auth: authSlice.reducer,
  cart: cartSlice.reducer,
  foods: foodsSlice.reducer,
  loadingBar: loadingBarSlice.reducer,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    foods: foodsReducer,
    loadingBar: loadingBarReducer,
    [foodsApi.reducerPath]: foodsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [likesApi.reducerPath]: likesApi.reducer,
    [userPlasesApi.reducerPath]: userPlasesApi.reducer,
    [meApi.reducerPath]: meApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      foodsApi.middleware,
      commentsApi.middleware,
      likesApi.middleware,
      userPlasesApi.middleware,
      meApi.middleware,
      rtkQueryErrorLogger
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch: () => AppDispatch = useDispatch

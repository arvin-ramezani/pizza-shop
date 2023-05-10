import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 */
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      console.log('We got a rejected action!', action);
      toast(
        `Error with status: ${action.payload?.status} and Message: ${action.payload?.data?.message}`,
        {
          type: 'error',
          position: 'top-center',
          autoClose: false,
          style: { direction: 'ltr' },
        }
      );
      // toast(
      //   `<p>${action.payload?.status} => ${action.payload?.data?.message}</p>`,
      //   {
      //     type: 'error',
      //   }
      // );
      // toast.warn({ title: 'Async error!', message: action.error.data.message })
    }

    return next(action);
  };

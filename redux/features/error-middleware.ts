import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/**
 * Log a warning and show a toast!
 **/
export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action) => {
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
    }

    return next(action);
  };

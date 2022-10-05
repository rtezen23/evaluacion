import { configureStore } from '@reduxjs/toolkit'
import user from './slices/user.slice';
import registers from './slices/registers.slice';
import error from './slices/error.slice';

export const store = configureStore({
  reducer: {
        user,
        registers,
        error,
  },
})
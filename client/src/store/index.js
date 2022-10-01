import { configureStore } from '@reduxjs/toolkit'
import showTab from './slices/showTab.slice';

export const store = configureStore({
  reducer: {
    showTab
  },
})
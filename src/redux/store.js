import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"
import themeSlice from "./reducers/themeSlice"

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice
  }
})
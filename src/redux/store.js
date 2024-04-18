import { configureStore } from "@reduxjs/toolkit"
import userSlice from "./reducers/userSlice"
import themeSlice from "./reducers/themeSlice"
import pomodoroSlice from "./reducers/pomodoroSlice"

export const store = configureStore({
  reducer: {
    theme: themeSlice,
    user: userSlice,
    pomodoro: pomodoroSlice,
  }
})
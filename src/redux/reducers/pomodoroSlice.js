import { createSlice } from '@reduxjs/toolkit';
import { stages } from '../../constants/pomodoro';

const initialState = {
    pomodoroTime: stages.pomodoroTime / 60,
    shortBreakTime: stages.shortBreakTime / 60,
    longBreakTime: stages.longBreakTime / 60,
};

const pomodoroSlice = createSlice({
    name: 'pomodoro',
    initialState,
    reducers: {
        setPomodoroTime: (state, action) => {
            state.pomodoroTime = action.payload;
        },
        setShortBreakTime: (state, action) => {
            state.shortBreakTime = action.payload;
        },
        setLongBreakTime: (state, action) => {
            state.longBreakTime = action.payload;
        },
    },

})

export const { setPomodoroTime, setShortBreakTime, setLongBreakTime } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;
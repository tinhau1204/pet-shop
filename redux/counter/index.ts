import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "@redux/store";

type CounterState = {
    value: number;
};

const initialState: CounterState = {
    value: 0,
};

export const counter = createSlice({
    name: "counter",
    initialState,
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        reset: () => initialState,
    },
});

export const getCount = (state: RootState) => state.counter.value;

export const { increment, decrement, reset } = counter.actions;

export default counter.reducer;

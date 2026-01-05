import { createSlice } from "@reduxjs/toolkit";

const initialState = { result: localStorage.getItem("serchResult") ? JSON.parse(localStorage.getItem("serchResult")) : null }

const productSerchSlice = createSlice({
    name: "serch",
    initialState,
    reducers: {
        setSerchResults: (state, action) => {
            state.result = action.payload;
            localStorage.setItem("serchResult", JSON.stringify(action.payload))
        }
    }
});

export const { setSerchResults } = productSerchSlice.actions;

export default productSerchSlice.reducer;
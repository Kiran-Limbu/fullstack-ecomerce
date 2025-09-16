import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: localStorage.getItem('userInfo') ?
        JSON.parse(localStorage.getItem('userInfo')) :
        null,
}

const authSlice = createSlice({
    name: 'logIn',
    initialState,
    reducers: {
        setCredientials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
            const expireTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // 30 days from now`
            localStorage.setItem('expireTime', expireTime);
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
});

export const { setCredientials, logout } = authSlice.actions;

export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";


const favoriteSlice = createSlice({
    name: "favorite",
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            // check if the product is already in Favorites or not
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload)
            }
        },
        removeFromFavorites: (state, action) => {
            //removing the product with matching Id
            return state.filter((product) => product._id !== action.payload._id)
        },
        setFavorites: (state, action) => {
            //saving the Favorites to our loaclstorage 
            return action.payload
        }
    }
});

export const {addToFavorites, removeFromFavorites, setFavorites} = favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites;
export default favoriteSlice.reducer;
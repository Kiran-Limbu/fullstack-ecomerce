import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";
import favoriteReducer from "../redux/features/favorites/favoriteSlice";
import { getFavoriteFromLocalStorage } from "../utils/localStorage";
import cartSliceReducer from"./features/cart/cartSlice";
import shopSliceReducer from "./features/shop/shopSlice";
 
const initialFavorite = getFavoriteFromLocalStorage() || [];


const store = configureStore({ 
    reducer:{
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoriteReducer,
        cart: cartSliceReducer,
        shop: shopSliceReducer,
    },
    preLoadedState: {
        favorite: initialFavorite
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch)

export default store;
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";

export const store = configureStore({
    reduce:{
        cart : cartSlice
    },
    devTools:true
})
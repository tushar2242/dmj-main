import { createSlice } from "@reduxjs/toolkit";

const addToCart = localStorage.getItem(addtocart)

const initialState = {
    search: 'd',
    addToCartProducts: addToCart,
}

const productSlice = createSlice({
    name: "dmj",
    initialState,
    reducers: {
        addSearch: (state, payload) => {
            state.search = payload
        }
    }

});


export const { addSearch } = productSlice.actions

export default productSlice.reducer;
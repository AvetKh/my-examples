import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../api/types";


type ProductState = {
	products: Product[];
}

const initialState: ProductState = {
	products: [],
}

export const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		updateProducts: (state, action) => {
			const products = action.payload
			state.products = products
		},
	},
})

const searchedProducts = (state: RootState) => state.search.products;

const updateProducts = searchSlice.actions.updateProducts;


export {
	updateProducts,
	searchedProducts,
}
export default searchSlice.reducer

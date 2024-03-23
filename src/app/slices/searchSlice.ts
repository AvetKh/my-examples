import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "../api/types";


type ProductState = {
	categoryProduct: {
		[categoryName: string]: Product[];
	}
	product: Product | null;
	favoriteProducts: number[] ;
}

const initialState: ProductState = {
	categoryProduct: {},
	product: null,
	favoriteProducts: []
}

export const productSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		updateCategoryProducts: (state, action) => {
			const { categoryName, productList } = action.payload
			state.categoryProduct[categoryName] = productList
		},
		getProduct: (state, action) => {
			const { id, category } = action.payload
			state.product = state.categoryProduct[category].find(product => product.id === id) || null
		},
		updateFavoriteList: (state, action) => {
			const { productId, category } = action.payload
			
			state.favoriteProducts = state.favoriteProducts || []
			
			if (state.favoriteProducts.includes(productId)) {
				const index = state.favoriteProducts.indexOf(productId);
				if (index !== -1) {
					state.favoriteProducts.splice(index, 1); // Remove productId from array
				}
			} else {
				state.favoriteProducts.push(productId);
			}
		}
	},
})

const product = (state: RootState) => state.product.product;
const favoriteProducts = (state: RootState) => state.product.favoriteProducts;
const getProductsByCategory = (state: RootState) => state.product.categoryProduct;

const getProduct = productSlice.actions.getProduct;
const updateFavoriteList = productSlice.actions.updateFavoriteList;
const updateCategoryProductsList = productSlice.actions.updateCategoryProducts;


export {
	product,
	favoriteProducts,
	getProductsByCategory,
	getProduct,
	updateFavoriteList,
	updateCategoryProductsList,
}
export default productSlice.reducer

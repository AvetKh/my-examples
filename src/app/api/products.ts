import { api } from "./_api.root";
import { GetParams, ProductsByCategoryResponse } from "./types";



export const productsApi = api.injectEndpoints({
	endpoints: builder => ( {
		getCategories: builder.query({
			query: () => ( {
				url: 'products/categories'
			} )
		}),
		getProductsByCategory: builder.mutation<ProductsByCategoryResponse, GetParams>({
			query: ({ categoryName}) => ( {
				url: `products/category/${categoryName}`,
			} ),
		}),
	} ),
})


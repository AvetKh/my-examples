import { api } from "./_api.root";
import { SearchResponse } from "./types";


export const searchApi = api.injectEndpoints({
	endpoints: (build) => ( {
		search: build.mutation<SearchResponse, string>({
			query: (searchTerm: '') => ( {
				method: 'get',
				url: `/products/search?q=${searchTerm}`,
			} )
		})
	} )
})

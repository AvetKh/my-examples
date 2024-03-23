import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { searchApi } from "../app/api/search";
import { useEffect, useState } from "react";
import { updateProducts } from "../app/slices/searchSlice";


export const useSearch = (defaultTerm: string = '') => {
	let timeoutId: NodeJS.Timeout;
	const navigation = useNavigation<any>()
	const dispatch = useDispatch();
	const [search] = searchApi.useSearchMutation();
	
	const [searchTerm, useSearchTerm] = useState(defaultTerm);
	
	const searchData = async () => {
		const response = await search(searchTerm)
		if ('data' in response) {
			dispatch(updateProducts(response.data.products))
			if (response.data.products) {
				navigation.navigate('Search', { term: searchTerm })
			}
		}
	}
	const debounceSearch = () => {
		clearTimeout(timeoutId);
		timeoutId = setTimeout(async () => {
			await searchData();
		}, 300); // Adjust delay as needed
	};
	
	useEffect(() => {
		if (searchTerm.length > 2) {
			debounceSearch()
		}
		return () => {
			clearTimeout(timeoutId);
			
		}
	}, [searchTerm]);
	
	return {
		searchTerm,
		useSearchTerm,
	}
}
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import { Product, productsApi } from "../app/api/products";
import { getProductsByCategory, updateCategoryProductsList } from "../app/slices/productSlice";


export const useGetCategoryProducts = () => {
	const dispatch = useDispatch();
	const [productList, setProductList] = useState<Product[] | null>([]);
	
	const [getData] = productsApi.useGetProductsByCategoryMutation();
	const categoryProducts = useSelector(getProductsByCategory);
	
	const cloneDeppList = (list: Product[]) => {
		const productList = _.cloneDeep(list);
		setProductList(productList)
	}
	const getCategoryProducts = async (categoryName: string) => {
		if (categoryProducts[categoryName]) {
			cloneDeppList(categoryProducts[categoryName])
			return
		}
		const res = await getData({ categoryName })
		if ('data' in res) {
			cloneDeppList(res.data.products)
			dispatch(updateCategoryProductsList({ categoryName, productList: res.data.products }))
		}
	}
	
	
	return { getCategoryProducts, productList }
}
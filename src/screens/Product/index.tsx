import { View } from "react-native";
import { useSelector } from "react-redux";
import { product } from "../../app/slices/productSlice";
import ProductView from "../../components/Product/ProductView";
import { CustomHeader } from "../../components/Header/CustomHeader";
import * as React from "react";


const ProductScreen = () => {
	const viewProduct = useSelector(product)
	
	return <View style={{
		flex: 1,
		padding: 16,
		height: 400,
		width: '100%',
	}}>
		{viewProduct && <ProductView viewProduct={viewProduct}/>}
	</View>
}

export default ProductScreen
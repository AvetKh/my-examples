import { StyleSheet, Text, View } from "react-native";
import { useEffect } from "react";

import { useGetCategoryProducts } from "../../hooks/useGetCategoryProducts";
import { TextButton } from "../Button/TextButton";
import ProductList from "./ProductList";
import { useNavigation } from "@react-navigation/native";


type CategoryProducts = {
	categoryName: string
}

const CategoryProducts = ({ categoryName }: CategoryProducts) => {
	const navigate = useNavigation<any>()
	const { getCategoryProducts, productList } = useGetCategoryProducts()
	
	useEffect(() => {
		getCategoryProducts(categoryName)
	}, [categoryName]);
	
	const seeAllProducts = () => {
		navigate.navigate('Categories', { screen: 'Catalogs', params: { categoryName: categoryName } })
	}
	
	return <>
		<View style={styles.tittleBlock}>
			<Text style={styles.tittle}>{categoryName.toUpperCase()}</Text>
			<TextButton
				text={'See All'}
				onPress={seeAllProducts}
				color={'#7867BE'}
			/>
		</View>
		<ProductList productList={productList}/>
	</>
}


const styles = StyleSheet.create({
	tittleBlock: {
		paddingTop: 15,
		backgroundColor: '#FFF',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 16,
		marginBottom: 10,
	},
	tittle: {
		fontSize: 17,
	},
})
export default CategoryProducts
import { Product } from "../../app/api/types";
import { Dimensions, StyleSheet, View } from "react-native";
import CategoryProduct from "./Product";


type ProductList = {
	productList: Product[] | null
}
const windowWidth = Dimensions.get('window').width;

const ProductList = ({ productList }: ProductList) => {
	
	return <View style={styles.container}>
		{productList?.map(item => <View
				key={item.id}
				style={styles.item}>
				<CategoryProduct product={item} key={item.id}/>
			</View>
		)}
	</View>
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		display: 'flex',
		flexDirection: 'row',
		paddingHorizontal: 8,
		flexWrap: 'wrap',
		backgroundColor: '#fff'
	},
	item: {
		alignItems: 'center',
		marginBottom: 10,
		width: ( windowWidth / 2 ) - 20,
		height: 220,
	}
})
export default ProductList
import { FlatList, StyleSheet, View } from "react-native";
import { Product } from "../../app/api/types";
import CategoryProduct from "../../components/Product/Product";
import { useSelector } from "react-redux";
import { searchedProducts } from "../../app/slices/searchSlice";
import { CustomHeader } from "../../components/Header/CustomHeader";
import { useRoute } from "@react-navigation/native";


const SearchScreen = () => {
	const products = useSelector(searchedProducts)
	const rout = useRoute<any>()
	
	const renderProductItem = ({ item }: { item: Product }) => (
		<View style={{
			width: '50%',
			height: 320,
			marginBottom: 10,
			marginRight: 2,
			borderRadius: 12
		}}>
			<CategoryProduct product={item} key={item.id}/>
		</View>
	);
	
	return <View style={styles.searchList}>
		<CustomHeader title={'Categories'} isSearchPage={true} term={rout.params.term}/>
		<FlatList
			numColumns={2}
			data={products}
			snapToInterval={300}
			snapToAlignment={'center'}
			renderItem={renderProductItem}
			showsVerticalScrollIndicator={false}
			showsHorizontalScrollIndicator={false}
			keyExtractor={(item) => `${item.id}`}
		/>
	</View>
}

const styles = StyleSheet.create({
	searchList: {
		flex: 1,
		paddingHorizontal: 15,
		borderWidth: 1,
	}
})
export default SearchScreen
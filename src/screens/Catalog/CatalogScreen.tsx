import { FlatList, View } from "react-native";
import { getProductsByCategory } from "../../app/slices/productSlice";
import { useSelector } from "react-redux";
import { useRoute } from "@react-navigation/native";
import { Product } from "../../app/api/types";
import CategoryProduct from "../../components/Product/Product";

const CatalogScreen = () => {
	const route = useRoute<any>();
	
	const product = useSelector(getProductsByCategory)
	const catName = route.params.categoryName
	
	
	const renderProductItem = ({ item }: { item: Product }) => (
		<View style={{
			width: '50%',
			height: 280,
			paddingHorizontal: 2,
			marginBottom: 5
		}}>
			<CategoryProduct product={item} key={item.id}/>
		</View>
	);
	
	return <FlatList
		numColumns={2}
		snapToInterval={300}
		data={product[catName]}
		contentContainerStyle={{
			paddingHorizontal: 8,
			paddingTop: 12,
		}}
		snapToAlignment={'center'}
		renderItem={renderProductItem}
		showsVerticalScrollIndicator={false}
		showsHorizontalScrollIndicator={false}
		keyExtractor={(item) => `${item.id}`}
	/>
}

export default CatalogScreen
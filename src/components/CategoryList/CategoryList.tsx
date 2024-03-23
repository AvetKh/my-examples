import { FlatList, View } from "react-native";
import CategoryProducts from "../Product/CategoryProducts";
import { productsApi } from "../../app/api/products";

const CategoryList = () => {
	const { data, isSuccess, isFetching } = productsApi.useGetCategoriesQuery('')
	
	return <FlatList
		data={data || []}
		renderItem={({ item }) => <View style={{
			borderBottomWidth: 1,
			borderBottomColor: 'rgba(180,180,180,0.8)',
		}}>
			<CategoryProducts categoryName={item}/>
		</View>}
	/>
}

export default CategoryList
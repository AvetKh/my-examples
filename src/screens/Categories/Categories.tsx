import { FlatList, Pressable, Text } from "react-native";
import { ImageBackground } from "expo-image";
import { productsApi } from "../../app/api/products";
import { useNavigation } from "@react-navigation/native";


type Categories = {}

const Categories = () => {
	const navigate = useNavigation<any>()
	const { data, isSuccess, isFetching } = productsApi.useGetCategoriesQuery('')
	
	const handlePress = (categoryName: string) => {
		navigate.navigate('Categories', { screen: 'Catalogs', params: { categoryName: categoryName } })
	}
	const renderItem = ({ item }: { item: string }) => {
		return <Pressable
			onPress={() => handlePress(item)}
			style={{
				width: '100%',
				height: 200,
				borderWidth: 1,
				borderRadius: 12,
				marginBottom: 15,
				backgroundColor: 'rgba(244,243,243,0.23)'
			}}>
			<ImageBackground style={{
				height: '100%',
				justifyContent: 'flex-end'
			}}>
				<Text style={{
					fontSize: 20,
					marginLeft: 15,
					marginBottom: 15
				}}>{item.toUpperCase()}</Text>
			</ImageBackground>
		</Pressable>
	}
	
	
	return <FlatList
		data={data}
		contentContainerStyle={{
			paddingHorizontal: 8,
			paddingTop: 12,
		}}
		renderItem={renderItem}
	/>
}

export default Categories
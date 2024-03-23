import { FlatList, View } from 'react-native'
import { ScreenWithSearchHeader } from "../../components/Header/HeaderHamlet";
import { favoriteProducts, getProductsByCategory } from "../../app/slices/productSlice";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Product } from "../../app/api/types";
import CategoryProduct from "../../components/Product/Product";


const WishListScreen = () => {
	const [wishList, setWishList] = useState<Product[]>([])
	
	const favoriteProductList = useSelector(favoriteProducts)
	const allProduct = useSelector(getProductsByCategory)
	
	useEffect(() => {
		const products = Object.values(allProduct).reduce((acc, products) => {
			acc.push(...products);
			return acc
		}, []);
		
		const favoriteProducts = products.filter(({ id }) => favoriteProductList.includes(id));
		
		setWishList(favoriteProducts)
		
	}, [favoriteProductList, allProduct]);
	
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
	
	return <ScreenWithSearchHeader>
		<FlatList
			numColumns={2}
			snapToInterval={300}
			data={wishList}
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
	</ScreenWithSearchHeader>
}

export default WishListScreen
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Image } from "expo-image";

import { Product } from "../../app/api/types";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import { useDispatch, useSelector } from "react-redux";
import { favoriteProducts, getProduct, updateFavoriteList } from "../../app/slices/productSlice";


type CategoryProduct = {
	product: Product
}

const CategoryProduct = ({ product }: CategoryProduct) => {
	const { navigate } = useNavigation<any>();
	const dispatch = useDispatch();
	const favoriteList = useSelector(favoriteProducts)
	
	const handlePress = () => {
		dispatch(getProduct({
			id: product.id,
			category: product.category
		}))
		navigate('ProductView')
	}
	const handlePressFavorite = () => {
		dispatch(updateFavoriteList({
			productId: product.id,
		}))
	}
	
	return <Pressable
		onPress={handlePress}
		style={styles.shadow}
	>
		<View style={styles.product}>
			<View style={styles.content}>
				
				<View style={styles.tittleBlock}>
					<FavoriteButton
						handlePressFavorite={handlePressFavorite}
						isFavorite={favoriteList.includes(product.id) || false}
					/>
				</View>
				<View style={{
					width: '100%',
					height: '100%',
				}}>
					<Image
						contentFit={'cover'}
						style={{
							width: '100%',
							height: '100%',
							borderRadius: 12,
						}} source={{ uri: product.images[0] }}/>
				</View>
			</View>
			<View style={styles.description}>
				<View><Text style={styles.textStyles}>{product.title}</Text></View>
				<View style={styles.ratingPriceBlock}>
					<Text style={styles.textStyles}>{product.price}</Text>
					<Text style={styles.textStyles}>{`${product.rating}$`}</Text>
				</View>
			</View>
		</View>
	</Pressable>
	
}

const styles = StyleSheet.create({
	shadow: {
		width: '95%',
		paddingTop: 2,
		borderRadius: 16,
		
	},
	tittleBlock: {
		position: 'absolute',
		top: 0,
		height: 40,
		zIndex: 999,
		width: "100%",
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
	},
	product: {
		backgroundColor: "#fff",
		overflow: "hidden",
	},
	content: {
		position: 'relative',
		alignItems: "center",
		width: '100%',
		height: '70%'
	},
	description: {
		width: '100%',
		height: '30%',
		justifyContent: 'space-around',
		paddingHorizontal: 8,
	},
	textStyles: {
		fontSize: 15
	},
	ratingPriceBlock: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
});

export default CategoryProduct
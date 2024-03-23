import { Animated, StyleSheet, Text, View } from "react-native";
import ImageCarousel from "../Carusel";
import { Product } from "../../app/api/types";
import { TextButton } from "../Button/TextButton";
import React from "react";
import { FavoriteButton } from "../FavoriteButton/FavoriteButton";
import BackButton from "../Button/BackButton";
import { favoriteProducts, updateFavoriteList } from "../../app/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ScrollView = Animated.ScrollView;


type ProductView = {
	viewProduct: Product
}

const ProductView = ({
	viewProduct
}: ProductView) => {
	const dispatch = useDispatch();
	const favoriteList = useSelector(favoriteProducts)
	const handlePressFavorite = () => {
		dispatch(updateFavoriteList({
			productId: viewProduct.id,
		}))
	}
	return <>
		<View style={styles.headerButton}>
			<BackButton/>
			<View><Text>
				<FavoriteButton
					handlePressFavorite={handlePressFavorite}
					isFavorite={favoriteList.includes(viewProduct.id) || false}
				/>
			</Text>
			</View>
		</View>
		<View style={styles.sliderBlock}>
			<ImageCarousel
				imagesPaths={viewProduct.images}
				style={{
					height: '100%',
					width: '100%',
				}}
			/>
		</View>
		<View style={styles.infoBlock}>
			<View>
				<View style={styles.tittleBlock}>
					<Text style={styles.tittle}>{viewProduct.title}</Text>
				</View>
				<View style={styles.characteristic}>
					<Text style={styles.price}>{viewProduct.price}$</Text>
					<Text style={styles.discountPercentage}>{viewProduct.discountPercentage}$</Text>
				</View>
				<View style={styles.characteristic}>
					<Text style={styles.type}>Rating:</Text>
					<Text style={styles.value}>{viewProduct.rating}</Text>
				</View>
				<View style={styles.characteristic}>
					<Text style={styles.type}>ID: </Text>
					<Text style={styles.value}>{viewProduct.id}</Text>
				</View>
				<View style={styles.characteristic}>
					<Text style={styles.type}>Brand: </Text>
					<Text style={styles.value}>{viewProduct.brand}</Text>
				</View>
				<View style={styles.characteristic}>
					<Text style={styles.type}>Category:</Text>
					<Text style={styles.value}>{viewProduct.category}</Text>
				</View>
			</View>
			<ScrollView style={styles.descriptionBlock}>
				<Text style={styles.description}>{viewProduct.description}</Text>
			</ScrollView>
		</View>
		<View style={styles.buttonBlock}>
			<View>
				<Text style={{
					marginBottom: 4
				}}>Total</Text>
				<Text style={styles.discountPercentage}>{viewProduct.discountPercentage}$</Text>
			</View>
			<View style={{ width: '50%' }}>
				<TextButton
					onPress={() => {
					}}
					text={'ADD TO CARD'}
					styles={{
						backgroundColor: '#7867BE',
						width: '100%',
						height: 50,
						justifyContent: 'center'
					}}
				/>
			</View>
		</View>
	</>
}

const styles = StyleSheet.create({
	tittleBlock: {
		marginTop: 15,
		marginBottom: 10,
	},
	tittle: {
		fontSize: 24
	},
	container: {
		flex: 1,
		padding: 20,
	},
	sliderBlock: {
		height: '30%',
		paddingHorizontal: 12,
		borderRadius: 12
	},
	infoBlock: {
		height: '45%',
		borderBottomWidth: 1,
		borderBottomColor: '#d9d9d9'
	},
	headerButton: {
		marginTop: 20,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '10%'
	},
	buttonBlock: {
		paddingVertical: 15,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '15%'
	},
	characteristic: {
		marginBottom: 5,
		display: 'flex',
		flexDirection: 'row',
		alignItems: "center"
	},
	price: {
		fontSize: 14,
		marginRight: 10,
		color: 'red',
		textDecorationLine: 'line-through'
	},
	discountPercentage: {
		fontSize: 17,
	},
	description: {
		fontSize: 17,
		lineHeight: 28,
		color: '#777777'
	},
	type: {
		fontSize: 17,
		marginRight: 10,
		color: '#252525'
	},
	value: {
		fontSize: 17,
		color: '#777777'
	},
	descriptionBlock: {
		height: 50
	}
})

export default ProductView
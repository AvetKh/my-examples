import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import { Image } from "expo-image";


type ImageCarouselType = {
	screenWith?: number;
	imagesPaths: string[]
	style?: { [key: string]: string | number };
}

const ImageCarousel = ({
	style,
	screenWith,
	imagesPaths,
}: ImageCarouselType) => {
	const windowWidth = Dimensions.get('window').width
	const width = screenWith || windowWidth;
	
	const rendImg = (img: string) => {
		return <Image
			style={{
				...style, width: '100%', height: '100%',
				backgroundColor: '#D9D9D9',
				
			}}
			contentFit={'contain'}
			source={{
				uri: img
			}}
		/>
	}
	
	return (
		<View style={styles.container}>
			<Carousel
				loop={false}
				width={width - 32}
				data={imagesPaths}
				style={{
					backgroundColor: '#D9D9D9',
					borderRadius: 12,
					alignItems: 'center',
					justifyContent: 'center',
					height: '100%'
				}}
				scrollAnimationDuration={1000}
				panGestureHandlerProps={{
					activeOffsetX: [-10, 10],
				}}
				renderItem={({ index, item }) => ( rendImg(item) )}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		paddingTop: 10,
		paddingHorizontal: 12,
		marginBottom: 10
	}
});

export default ImageCarousel;
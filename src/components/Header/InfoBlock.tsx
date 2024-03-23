import { Button, StyleSheet, View } from "react-native";
import * as React from "react";


type InfoBlockType = {
	isPlaying: boolean,
	togglePlay: () => Promise<void>;
}

const InfoBlock = ({
	isPlaying,
	togglePlay,
}: InfoBlockType) => {
	return <View style={styles.infoBlock}>
		<View>
			
		</View>
		<View style={styles.controls}>
			<Button title={'More Info'} onPress={togglePlay}/>
			<Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlay}/>
		</View>
	</View>
}

const styles = StyleSheet.create({
	controls: {
		display: 'flex',
		flexDirection:'row',
	},
	infoBlock: {
		position: 'absolute',
		left: 10,
		top: 0,
		width: '50%',
		height: '100%',
		zIndex: 1
	}
})
export default InfoBlock
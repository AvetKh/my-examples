import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import Header from "./index";


export function ScreenWithSearchHeader({
	children = null as ReactNode,
}) {
	return <View style={styles.hamletStyles}>
		<Header/>
		{children}
	</View>
}


const styles = StyleSheet.create({
	hamletStyles: {
		flex: 1,
		backgroundColor: '#FFF',
		paddingTop: 60
	}
})
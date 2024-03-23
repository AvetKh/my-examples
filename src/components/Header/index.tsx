import { StyleSheet, View } from "react-native";

import React from "react";
import { SearchInput } from "../SearchInput/SearchInput";
import { Image } from "expo-image";
import { useSearch } from "../../hooks/useSearch";


const Header = ({}) => {
	const { searchTerm, useSearchTerm } = useSearch('')
	
	
	return <View style={styles.header}>
		<View style={styles.logBlock}>
			<Image
				contentFit={'fill'}
				style={{ width: '100%', height: '100%', borderWidth: 0 }}
				source={require('../../assets/logo/8_1sasa11.jpg')}
			/>
		</View>
		<View style={{
			flex: 1,
			paddingLeft: 16,
			alignItems: 'flex-end'
		}}>
			<SearchInput
				placeholder={'Search'}
				value={searchTerm}
				setValue={useSearchTerm}
				closeButton={() => {
				}}
			/>
		</View>
	</View>
}

const styles = StyleSheet.create({
	header: {
		display: 'flex',
		flexDirection: 'row',
		paddingRight: 16,
		paddingLeft: 8
	},
	logBlock: {
		paddingLeft: 2,
		width: 50,
		height: 40
	}
})
export default Header
import { View, Text, StyleSheet } from "react-native";
import { Image } from "expo-image";

const avatar = require('../../assets/avatar.png')

type Profile = {}

const Profile = () => {
	
	return <View style={styles.container}>
		<View style={styles.avatarBlock}>
			<Image source={avatar} style={styles.image} />
		</View>
		<Text style={styles.menuItem}> User 1234 </Text>
	</View>
}


const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 25,
	},
	avatarBlock: {
		width: 70,
		height: 70,
		borderRadius: 30
	},
	
	image: {
		width: '100%',
		height: '100%',
	},
	menuItem: {
		color: '#fff',
		fontSize: 25,
		marginLeft: 15
	},
})
export default Profile
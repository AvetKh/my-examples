import { StyleSheet, Text, View } from 'react-native'
import { TextButton } from "../../components/Button/TextButton";
import { BIcon } from "../../assets";
import { userLoggedOut } from "../../app/slices/userSlice";
import { useAuthState } from "../../hooks/useAuthState";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";


const ProfileScreen = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { isLoggedIn, goToLoginScreen } = useAuthState();
	
	const logout = () => {
		dispatch(userLoggedOut())
	}
	
	useEffect(() => {
		if (!isLoggedIn) goToLoginScreen()
	}, [isLoggedIn]);
	
	return <View style={{
		flex: 1,
		backgroundColor: '#FFF'
	}}>
		<View style={styles.headerBlock}>
			<Text style={styles.tittle}>PROFILE</Text>
		</View>
		<View style={styles.userData}>
			<View style={styles.userInfoBlock}>
				<View style={styles.avatarBlock}></View>
				<View style={{
					height: '100%',
					justifyContent: 'space-around'
				}}>
					<Text style={[styles.userInfo, { color: 'rgb(41,40,40)' }]}>Artur GGG</Text>
					<Text style={styles.userInfo}>Male</Text>
				</View>
			</View>
		</View>
		<View style={styles.footer}>
			<View style={styles.buttons}>
				<BIcon name={'logout'} color={'#1a1a1a'} size={25} rotate={1}/>
				<TextButton
					text={'Log Out'}
					onPress={() => logout()}
					styles={{
						marginTop: 8,
					}}
					textStyles={{
						fontSize: 20,
						color: '#1a1a1a',
					}}/>
			</View>
		</View>
	</View>;
}

const styles = StyleSheet.create({
	headerBlock: {
		flex: 1,
		paddingTop: 10,
		alignItems: "center",
		justifyContent: "center"
	},
	userInfoBlock: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		height: 100,
		borderBottomColor: '#d9d9d9',
		borderBottomWidth: 1
	},
	userInfo: {
		fontSize: 20,
		color: '#d9d9d9'
	},
	tittle: {
		fontSize: 24
	},
	avatarBlock: {
		borderRadius: 50,
		width: 80,
		height: 80,
		marginRight: 10,
		backgroundColor: 'silver'
	},
	userData: {
		flex: 4,
		paddingHorizontal: 12,
	},
	footer: {
		flex: 1,
		justifyContent: 'center',
	},
	buttons: {
		flexDirection: 'row',
		alignItems: 'center',
		height: 60,
		paddingHorizontal: 12,
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderBottomColor: '#d9d9d9',
		borderTopColor: '#d9d9d9'
	}
})
export default ProfileScreen
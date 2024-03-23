import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { Image } from 'expo-image'
import React, { useEffect, useState } from "react";
import { useI18N } from "../assets/i18n";
import { TextButton } from "../components/Button/TextButton";
import { BFormInput } from "../components/TextInput/BFTextInput";
import { authApi } from "../app/api/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLoggedInState, updateUserSettings } from "../app/slices/userSlice";
import { useNavigation } from "@react-navigation/native";
import { AppDispatch } from "../app/store";


const AuthScreen = () => {
	const [t] = useI18N("auth");
	const navigation = useNavigation<any>();
	const dispatch = useDispatch<AppDispatch>();
	const token = useSelector(selectUserLoggedInState)
	const [userName, setUseName] = useState('')
	const [password, setPassword] = useState('')
	
	const [auth] = authApi.useLoginMutation()
	
	const loginUser = async () => {
		const res = await auth({ username: 'kminchelle', password: '0lelplR' })
		if ('data' in res) {
			dispatch(updateUserSettings(res.data))
		}
	}
	
	useEffect(() => {
		if (token) {
			navigation.navigate('Tabs')
		}
	}, [token]);
	return <View
		style={[
			styles.container, { flexDirection: 'column', },
		]}>
		<View style={styles.tittleBlock}>
			<Text style={styles.tittle}>{t('signIn').toUpperCase()}</Text>
		</View>
		<View style={styles.logBlock}>
			<Image
				style={{ width: '100%', height: '100%' }}
				source={require('../assets/logo/8_1sasa11.jpg')}
			/>
		</View>
		<KeyboardAvoidingView
			style={styles.inputs}
			behavior="padding" enabled
		>
			<View style={styles.width}>
				<BFormInput
					value={userName}
					setValue={setUseName}
					label={'Username'}
				/>
				<BFormInput
					label={'Password'}
					password={true}
					value={password}
					setValue={setPassword}
				/>
			</View>
			<View style={styles.width}>
				<TextButton
					onPress={loginUser}
					text={t('signIn')}
					styles={{
						backgroundColor: '#7867BE',
						width: '100%',
						height: 50,
						justifyContent: 'center'
					}}
				/>
			</View>
		</KeyboardAvoidingView>
	</View>
	
}

const styles = StyleSheet.create({
	width: { width: '100%', },
	container: {
		flex: 1,
		backgroundColor: '#Fff',
		// padding: 20,
		paddingHorizontal: 16
	},
	tittleBlock: { flex: 1, marginTop: 20, alignItems: 'center', justifyContent: 'center' },
	tittle: {
		marginTop: 10,
		fontSize: 24
	},
	logBlock: { flex: 2 },
	inputs: { flex: 3, justifyContent: 'space-around', alignItems: 'center', paddingTop: 30 }
});
export default AuthScreen
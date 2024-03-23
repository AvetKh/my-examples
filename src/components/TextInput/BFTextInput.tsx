import {
	Animated,
	Easing,
	Keyboard,
	KeyboardType,
	ReturnKeyTypeOptions,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native';

import React, { useEffect, useRef, useState } from "react";
import { BIcon, IconName } from "../../assets";


type BFormInputPropsType = {
	isOTP?: boolean;
	value?: string;
	setValue?: (value: string) => void;
	label: string
	helperText?: string
	keyboardType?: KeyboardType
	icon?: IconName
	isSuccess?: boolean;
	password?: boolean;
	hasInformationIcon?: boolean;
	blurOnSubmit?: boolean;
	returnKeyType?: ReturnKeyTypeOptions;
	autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters' | undefined;
	setInputKey?: (input: TextInput | null) => void;
	onSubmitEditing?: () => void;
}

export const BFormInput = ({
	isOTP,
	value = '',
	setValue = () => {
	},
	label,
	helperText = '',
	icon,
	keyboardType,
	isSuccess = false,
	password = false,
	hasInformationIcon = true,
	blurOnSubmit = false,
	returnKeyType = 'done',
	autoCapitalize = 'none',
	setInputKey = () => {
	},
	onSubmitEditing,
}: BFormInputPropsType) => {
	const [hasFocus, setHasFocus] = useState(false);
	const [isShowPassword, setIsShowPassword] = useState(password);
	
	const anime = useRef(new Animated.Value(0)).current
	
	const focused = !!value || hasFocus
	
	useEffect(() => {
		const animation = Animated.timing(anime, {
			toValue: focused ? 1 : 0,
			duration: 200,
			easing: Easing.in(Easing.linear),
			useNativeDriver: false
		})
		animation.start();
		
		return () => animation.stop();
	}, [anime, focused])
	
	const submitEditingHandler = () => {
		Keyboard.dismiss();
	};
	
	return <View style={{ alignItems: "center" }}>
		<Animated.Text style={{
			position: 'absolute',
			color: "#847E7B",
			top: anime.interpolate({ inputRange: [0, 1], outputRange: [28, 10] }),
			left: icon ? anime.interpolate({ inputRange: [0, 1], outputRange: [28, 0] }) : 0,
			fontSize: anime.interpolate({ inputRange: [0, 1], outputRange: [15, 12] }),
			// lineHeight: anime.interpolate({ inputRange: [0, 1], outputRange: [18, 15] }),
		}}
		>{label}</Animated.Text>
		<View style={{
			borderBottomColor: '#eeeeee',
			borderBottomWidth: 1,
			paddingBottom: 4,
			marginTop: 26,
			display: "flex",
			flexDirection: "row",
			alignItems: "center",
		}}>
			{icon && <BIcon name={icon} rotate={1} size={20}/>}
			<TextInput
				ref={(input: TextInput) => setInputKey(input)}
				onFocus={() => setHasFocus(true)}
				onBlur={() => setHasFocus(false)}
				keyboardType={keyboardType}
				secureTextEntry={isShowPassword}
				value={value}
				onChangeText={setValue}
				autoCorrect={false}
				returnKeyType={returnKeyType}
				blurOnSubmit={blurOnSubmit}
				autoCapitalize={autoCapitalize}
				autoComplete={isOTP ? 'sms-otp' : undefined}
				textContentType={isOTP ? 'oneTimeCode' : undefined}
				onSubmitEditing={typeof ( onSubmitEditing ) === 'function' ? onSubmitEditing : submitEditingHandler}
				style={{
					width: 0,
					borderWidth: 0,
					flexGrow: 1,
					lineHeight: 20,
					fontSize: 15,
					paddingLeft: 4,
					marginBottom: 4,
				}}
			/>
			{password ? (
				<TouchableOpacity onPress={() => setIsShowPassword((prevState) => !prevState)}>
					{isShowPassword ? (
						<BIcon name={'eye'} size={20} rotate={1}/>
					) : (
						<BIcon name={'eye-off'}  size={20} rotate={1}/>
					)}
				</TouchableOpacity>
			) : (
				( !hasFocus && value.length > 0 && hasInformationIcon ) && (
					isSuccess ? (
						<BIcon name={'check'} size={20} rotate={1} color={'green'}/>
					) : (
						<BIcon name={'alert'}  size={20} rotate={1} color={'red'}/>
					)
				)
			)}
		</View>
		<Animated.View style={{
			width: anime.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
			borderBottomWidth: 1,
			transform: [{ translateY: -1 }],
			borderBottomColor: '#B71E4E'
		}}/>
		<Text style={{ alignSelf: 'flex-start', fontSize: 13, lineHeight: 18, color: 'orange' }}>
			{helperText}
		</Text>
	
	</View>
}

import { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { useKeyboard } from "@react-native-community/hooks";
import { BIcon, IconName } from "../../assets";


type SearchInputProps = {
	placeholder: string;
	value: string;
	setValue: (value: string) => void;
	onIconPress?: () => unknown;
	icon?: IconName;
	onFocus?: () => unknown;
	onBlur?: () => unknown;
	closeButton: () => void
};

export const SearchInput = ({
	placeholder,
	value,
	setValue,
	onFocus,
	onBlur,
	onIconPress,
}: SearchInputProps) => {
	
	const { keyboardShown } = useKeyboard();
	const inputRef = useRef<TextInput>(null);
	const [isFocused, setIsFocused] = useState(false);
	const [startTyping, setStartTyping] = useState(false);
	
	const handleFocus = () => {
		setIsFocused(true);
		onFocus && onFocus();
	};
	
	const handleBlur = () => {
		setIsFocused(false);
		onBlur && onBlur();
	}
	
	const handleIconPress = () => {
		setStartTyping(!startTyping)
		
		if (!startTyping) {
			inputRef.current?.focus()
		} else {
			inputRef.current?.blur()
			onIconPress && onIconPress();
			setValue('')
		}
		
	}
	
	
	useEffect(() => {
		if (!keyboardShown) {
			inputRef?.current?.blur()
		}
	}, [keyboardShown, value])
	
	
	return (
		<View style={{
			display: 'flex',
			flexDirection: 'row',
			paddingLeft: 10,
			width: '100%',
			justifyContent: 'flex-end',
			alignItems: 'center',
			// backgroundColor: '#FFF',
		}}>
			<View
				style={[
					styles.container, {
						width: startTyping ? '92%' : '0%',
						borderWidth: startTyping ? 0.6 : 0,
						backgroundColor: startTyping ? '#F4F4F4' : '#fff',
						borderColor: startTyping ? '#F4F3F3' : 'transparent',
						paddingVertical: startTyping ? 8 : 0,
						paddingHorizontal: startTyping ? 10 : 0,
					},
				]}
			>
				<TextInput
					ref={inputRef}
					value={value}
					placeholder={placeholder}
					onChangeText={setValue}
					onFocus={handleFocus}
					onBlur={handleBlur}
					autoCorrect={false}
					returnKeyType={'done'}
					placeholderTextColor={'black'}
				/>
				
			</View>
			<Pressable onPress={handleIconPress} style={styles.iconBlock}>
				<BIcon
					name={startTyping ? 'close' : 'search'}
					rotate={1}
					size={25}
					color={isFocused ? 'black' : 'grey'}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		borderRadius: 30,
	},
	input: {
		flex: 1,
		paddingHorizontal: 6,
	},
	iconBlock: {
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#F4F3F3',
		borderRadius: 50,
		marginLeft: 5,
		width: 35,
		height: 35
	}
});

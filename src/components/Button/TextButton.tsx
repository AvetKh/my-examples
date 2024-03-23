import { Pressable, Text, ViewStyle } from 'react-native';
import { useState } from 'react';
import { useI18N } from "../../assets/i18n";


type TextButtonProps = {
	text: string;
	styles?: ViewStyle;
	disabled?: boolean;
	fillBackground?: string;
	pressedColor?: string;
	onPress: () => unknown;
};

export function TextButton({
	text,
	styles,
	disabled = false,
	pressedColor = '#F8F0F6',
	fillBackground,
	onPress
}: TextButtonProps) {
	const [isOnPressing, setIsOnPressing] = useState(false);
	
	return (
		<Pressable
			onPress={onPress}
			onPressIn={() => setIsOnPressing(true)}
			onPressOut={() => setIsOnPressing(false)}
			disabled={disabled}
			style={{
				backgroundColor: isOnPressing ? pressedColor : fillBackground,
				alignSelf: 'flex-start',
				paddingVertical: 8,
				paddingHorizontal: 12,
				borderRadius: 25,
				...styles,
			}}
		>
			<Text
				style={{
					fontSize: 20,
					color: '#FFF',
				}}
			>{text}</Text>
		</Pressable>
	);
}

import { Pressable, Text, ViewStyle } from 'react-native';
import { useState } from 'react';


type TextButtonProps = {
	text: string;
	styles?: ViewStyle;
	disabled?: boolean;
	fillBackground?: string;
	pressedColor?: string;
	color?: string;
	textStyles?: ViewStyle,
	onPress: () => unknown;
};

export function TextButton({
	text,
	styles,
	disabled = false,
	pressedColor = '#F8F0F6',
	color,
	fillBackground,
	onPress,
	textStyles
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
				borderRadius: 12,
				...styles,
			}}
		>
			<Text
				style={{
					fontSize: 17,
					color: color || '#e0e0e0',
					textAlign: 'center',
					...textStyles
				}}
			>{text}</Text>
		</Pressable>
	);
}

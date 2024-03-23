import React, { useState } from 'react';
import { Pressable, ViewStyle } from 'react-native';

import { AnimateProps } from "react-native-reanimated";
import { PathProps } from "react-native-svg";
import { BIcon, IconName } from "../../assets";

type IconButtonProps = {
	icon: IconName;
	iconColor?: string;
	size?: number;
	backgroundColor?: string;
	pressedColor?: string;
	iconAnimatedProps?: Partial<AnimateProps<PathProps>>
	disabled?: boolean;
	styles?: ViewStyle;
	onPress?: () => unknown;
};

export function IconButton({
	icon,
	iconColor,
	size = 24,
	backgroundColor = '#F4F3F3',
	pressedColor = '#F8F0F6',
	disabled = false,
	styles,
	iconAnimatedProps,
	onPress
}: IconButtonProps) {
	const [isOnPressing, setIsOnPressing] = useState(false);
	
	return (
		<Pressable
			onPress={onPress}
			onPressIn={() => setIsOnPressing(true)}
			onPressOut={() => setIsOnPressing(false)}
			disabled={disabled}
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				alignSelf: 'flex-start',
				backgroundColor: isOnPressing ? pressedColor : backgroundColor,
				borderRadius: 50,
				padding: 8,
				...styles,
			}}
		>
			<BIcon
				name={icon}
				animatedProps={iconAnimatedProps && iconAnimatedProps}
				rotate={1}
				color={disabled ? '#847E7B' : ( iconColor ?? '#847E7B' )}
				size={size}
			/>
		</Pressable>
	);
}

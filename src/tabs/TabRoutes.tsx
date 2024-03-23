import { Platform, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../screens/Home";
import CategoriesScreen from "../screens/Categories";
import ProfileScreen from "../screens/Profile";
import WishListScreen from "../screens/WishList";

import { useI18N } from "../assets/i18n";
import { BIcon } from "../assets";
import { useAuthState } from "../hooks/useAuthState";
import { useEffect } from "react";


const isAndroid = Platform.OS === 'android';

const Tab = createBottomTabNavigator();

export function TabRoutes() {
	const [t] = useI18N("Tabs");
	const { isLoggedIn, goToLoginScreen } = useAuthState();
	
	const labelStyle = (focused: boolean) => {
		return {
			color: focused ? '#7867BE' : '#CACACA',
			fontSize: 13,
			marginBottom: isAndroid ? 20 : 1
		}
	}
	
	useEffect(() => {
		if (!isLoggedIn){
			goToLoginScreen()
		}
	}, [isLoggedIn]);
	
	return <Tab.Navigator
		initialRouteName={'Home'}
		screenOptions={{
			headerShown: false,
			tabBarStyle: {
				height: isAndroid ? 85 : 90,
				borderTopColor: '#FFF',
				shadowColor: isAndroid ? "rgb(0,0,0)" : "rgba(119,119,119,0.8)",
				shadowOffset: { width: 0, height: 0 },
				shadowOpacity: 0.15,
				shadowRadius: 4,
				elevation: 8,
			},
			tabBarLabelStyle: {
				color: '#CACACA',
				fontSize: 10,
				marginBottom: 5,
			},
			tabBarIconStyle: {
				color: '#CACACA'
			},
			tabBarActiveTintColor: '#7867BE',
		}}>
		<Tab.Screen
			name={'Home'}
			component={HomeScreen}
			options={{
				tabBarLabel: (props) => <Text
					style={labelStyle(props.focused)}
				>{t('Home')}</Text>,
				tabBarIcon: ({ size, color }) => <BIcon
					size={size} color={color} rotate={1} name={'home'}
				/>
			}}
		/>
		<Tab.Screen
			name={'Categories'}
			component={CategoriesScreen}
			options={{
				tabBarLabel: (props) => <Text
					style={labelStyle(props.focused)}
				>{t('Categories')}</Text>,
				tabBarIcon: ({ size, color }) => <BIcon
					size={size} color={color} rotate={1} name={'category'}
				/>
			}}
		/>
		<Tab.Screen
			name={'WishList'}
			component={WishListScreen}
			options={{
				tabBarLabel: (props) => <Text
					style={labelStyle(props.focused)}
				>{t('WishList')}</Text>,
				tabBarIcon: ({ size, color }) => <BIcon
					size={size} color={color} rotate={1} name={'favourite'}
				/>
			}}
		/>
		<Tab.Screen
			name={'Profile'}
			component={ProfileScreen}
			options={{
				tabBarLabel: (props) => <Text
					style={labelStyle(props.focused)}
				>{t('Profile')}</Text>,
				tabBarIcon: ({ size, color }) => <BIcon size={size} color={color} rotate={1} name={'profile'}/>
			}}
		/>
	</Tab.Navigator>
}

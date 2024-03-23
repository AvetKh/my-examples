import * as React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { NavigationContainer } from '@react-navigation/native';

import AuthScreen from "./src/screens/AuthScreen";
import ProductScreen from "./src/screens/Product";

import { TabsRouteParams } from "./src/app/routs/types";
import { store } from "./src/app/store";
import { TabRoutes } from "./src/tabs/TabRoutes";
import SearchScreen from "./src/screens/Search";


const RootStack = createNativeStackNavigator<TabsRouteParams>()

export default function App() {
	return (
		<StoreProvider store={store}>
			<NavigationContainer>
				<RootStack.Navigator initialRouteName={'Auth'} screenOptions={{
					headerBackVisible: false,
					headerShown: false,
					animation: 'slide_from_right'
				}}>
					<RootStack.Screen name={'Tabs'} component={TabRoutes}/>
					<RootStack.Screen name={'Auth'} component={AuthScreen}/>
					<RootStack.Screen name={'Search'} component={SearchScreen}/>
					<RootStack.Screen name={'ProductView'} component={ProductScreen}/>
				</RootStack.Navigator>
			</NavigationContainer>
		</StoreProvider>
	);
}
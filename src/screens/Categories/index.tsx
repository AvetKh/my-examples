import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CategoryScreens } from "../../app/routs/types";
import { CustomHeader } from "../../components/Header/CustomHeader";
import CatalogScreen from "../Catalog/CatalogScreen";
import Categories from "./Categories";

const Stack = createNativeStackNavigator<CategoryScreens>();


const CategoriesScreen = () => {
	
	
	return <Stack.Navigator initialRouteName={'Category'} screenOptions={{ headerShadowVisible: false }}>
		<Stack.Screen
			name={'Category'}
			component={Categories}
			options={{ header: () => <CustomHeader title={'Category'}/>, contentStyle: { marginTop: -16 } }}
		/>
		<Stack.Screen
			name={'Catalogs'}
			component={CatalogScreen}
			options={{ header: () => <CustomHeader title={'Categories'}/>, contentStyle: { marginTop: -16 } }}
		/>
	</Stack.Navigator>
	
	
}

export default CategoriesScreen
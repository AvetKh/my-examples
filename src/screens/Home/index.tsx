import { View } from 'react-native'
import { ScreenWithSearchHeader } from "../../components/Header/HeaderHamlet";
import CategoryList from "../../components/CategoryList/CategoryList";

const HomeScreen = () => {
	
	return <ScreenWithSearchHeader>
		<View style={{
			backgroundColor: '#F9F9F9'
		}}>
			<CategoryList/>
		</View>
	</ScreenWithSearchHeader>
}

export default HomeScreen
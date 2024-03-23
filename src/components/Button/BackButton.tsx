import { BIcon } from "../../assets";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";



const BackButton = (style?: any ) => {
	const { goBack } = useNavigation();
	
	return <Pressable onPress={goBack} style={style}>
		<BIcon name={'arrow-left'} size={25} rotate={1} color={'black'}/>
	</Pressable>
}

export default BackButton
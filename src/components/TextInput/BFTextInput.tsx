import { TextInputBase, View } from "react-native";


type TextInput = {
	placeholder: string,
	value: string,
	setValue: (key: string) => void
	styles: any
}

const BFInput = ({
	value,
	setValue,
	placeholder,
	styles,
}:TextInput) => {
	
	return <View>
		<Tex
			multiline
			value={value}
			numberOfLines={4}
			onChangeText={setValue}
			placeholder={placeholder}
			style={[styles]}
		/>
	</View>
}

export default BFInput
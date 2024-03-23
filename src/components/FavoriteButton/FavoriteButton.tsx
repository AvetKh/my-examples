import { IconButton } from "./IconButton";
import { Pressable } from "react-native";


type FavoriteButtonProps = {
	handlePressFavorite: () => void
	isFavorite: boolean;
};

export const FavoriteButton = ({
	isFavorite = true,
	handlePressFavorite,
}: FavoriteButtonProps) => {
	
	return (
		<Pressable>
			<IconButton
				iconColor={isFavorite ? 'rgba(255,15,15,0.74)' : '#1a1a1a'}
				pressedColor={"#ffffff30"}
				backgroundColor={"rgba(0,0,0,0)"}
				icon={isFavorite ? "heart-filled" : "heart-outline"}
				onPress={handlePressFavorite}
			/>
		</Pressable>
	);
};

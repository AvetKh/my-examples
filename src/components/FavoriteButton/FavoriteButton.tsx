import { IconButton } from ".";
import { useCandellaTheme } from "../theme";
import { useFavoriteProduct, useFavoriteSupplier } from "@app/hooks";


type FavoriteButtonProps = {
	id: number;
	type: "supplier" | "article";
	isFavoritesScreen: boolean;
	isProductIcon?: boolean
};

export const FavoriteButton = ({
	id,
	type,
	isFavoritesScreen,
	isProductIcon = false,
}: FavoriteButtonProps) => {
	const { isFavorite, toggle } = type === "supplier"
		? useFavoriteSupplier(id)
		: useFavoriteProduct(id);
	
	const { colors } = useCandellaTheme();
	
	return (
		<>
			{isFavoritesScreen ? (
				<IconButton
					backgroundColor={"transparent"}
					pressedColor={"#ffffff30"}
					icon={"close"}
					iconColor={colors.white}
					onPress={toggle}
				/>
			) : (
				<IconButton
					iconColor={isFavorite ? colors.primary.main : (isProductIcon ? colors.outOfStack.isStock :  '#FFF')}
					pressedColor={"#ffffff30"}
					backgroundColor={"rgba(0,0,0,0)"}
					icon={isFavorite ? "heart-filled" : "heart-outline"}
					onPress={toggle}
				/>
			)}
		</>
	);
};

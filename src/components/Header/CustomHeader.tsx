import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { IconButton } from "../FavoriteButton/IconButton";
import { SearchInput } from "../SearchInput/SearchInput";
import { useSearch } from "../../hooks/useSearch";


type CustomHeaderProps = {
	title?: string;
	withCloseIcon?: boolean;
	withArrowRight?: boolean;
	styles?: any
	isSearchPage?: boolean;
	term: string
};

export const CustomHeader = ({
	title = '',
	term = '',
	withCloseIcon = false,
	withArrowRight = !withCloseIcon,
	styles = {},
	isSearchPage = false
}: CustomHeaderProps) => {
	const { searchTerm, useSearchTerm } = useSearch(term)
	
	const navigation = useNavigation();
	const insets = useSafeAreaInsets();
	
	return (
		<View
			style={{
				backgroundColor: '#FFF',
				paddingTop: insets.top,
				paddingHorizontal: 10,
				flexDirection: 'row',
				alignItems: 'center',
				// justifyContent: 'space-between',
				paddingBottom: 16,
				...styles
			}}
		>
			<View style={{ flex: 1 }}>
				{withArrowRight && (
					<IconButton
						icon={'arrow-left'}
						backgroundColor={'transparent'}
						iconColor={'black'}
						onPress={() => {
							if (searchTerm.length > 1) {
								useSearchTerm('')
							}
							navigation.goBack()
						}}
					/>
				)}
			</View>
			{!isSearchPage && <View style={{ flex: 1 }}>
				{title.length > 0 && (
					<Text style={{
						fontSize: 20,
						lineHeight: 24,
						marginLeft: +!!withArrowRight * 4,
					}}>{title}</Text>
				)}
            </View>}
			<View style={{
				flex: isSearchPage ? 4 : 1,
				width: '100%'
			}}>
				<SearchInput
					placeholder={'Search'}
					value={searchTerm}
					setValue={useSearchTerm}
					closeButton={() => {
					}}
				/>
			</View>
		</View>
	);
};

import { NavigationProp } from "@react-navigation/core/src/types";


export type TabsRouteParams = {
	Home: undefined;
	Search: undefined;
	TvShow: undefined;
	Movies: undefined;
	Genres: undefined;
	WatchLater: undefined;
};

export type TabsNavPropsType = NavigationProp<TabsRouteParams>;

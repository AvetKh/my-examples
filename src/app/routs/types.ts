import { NavigationProp } from "@react-navigation/core/src/types";

export type CategoryScreens = {
	Category: undefined,
	Catalogs: {
		categoryName: string
	}
}

export type TabsRouteParams = {
	Tabs: {
		Home: undefined;
		Categories: CategoryScreens
		WishList: undefined;
		Profile: undefined;
	}
	Auth: undefined;
	ProductView: undefined;
	Search: undefined
};

export type TabsNavPropsType = NavigationProp<TabsRouteParams>;

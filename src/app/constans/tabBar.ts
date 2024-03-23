import HomeScreen from "../../screens/Home";
import CategoriesScreen from "../../screens/Categories";
import WishListScreen from "../../screens/WishList";
import ProfileScreen from "../../screens/Profile";
import { RoutNames } from "./types";
import { IconName } from "../../assets";


const tabsColor = '#CACACA'
const iconsSize = 24

type TabBarTypes = {
	id: number,
	name: RoutNames,
	tittle: {
		name: RoutNames,
		color: string
	},
	icon: {
		iconName: IconName,
		color: string,
		size: number
	},
}

export const TAB_BAR: TabBarTypes[] = [
	{
		id: 1,
		name: 'Home',
		tittle: {
			name: 'Home',
			color: tabsColor
		},
		icon: {
			iconName: 'home',
			color: tabsColor,
			size: iconsSize
		},
	},
	{
		id: 2,
		name: 'Categories',
		tittle: {
			name: 'Categories',
			color: tabsColor
		},
		icon: {
			iconName: 'home',
			color: tabsColor,
			size: iconsSize
		},
	},
	{
		id: 3,
		name: 'WishList',
		tittle: {
			name: 'WishList',
			color: tabsColor
		},
		icon: {
			iconName: 'favourite',
			color: tabsColor,
			size: iconsSize
		},
	},
	{
		id: 4,
		name: 'Profile',
		tittle: {
			name: 'Profile',
			color: tabsColor
		},
		icon: {
			iconName: 'profile',
			color: tabsColor,
			size: iconsSize
		},
	},
]
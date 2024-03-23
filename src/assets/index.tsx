import { MenuList } from "../app/constans/types";


const Home = require('./icons/Group 46.png')
const WatchLater = require('./icons/Group 47.png')
const Genres = require('./icons/Group 53.png')
const Movies = require('./icons/Group 54.png')
const TvShow = require('./icons/Group 56.png')
const Search = require('./icons/ICON - Search.png')


const menuList: MenuList = [
	{ id: 1, imageUrl: Home, tittle: 'Home' },
	{ id: 2, imageUrl: Search, tittle: 'Search' },
	{ id: 3, imageUrl: Genres, tittle: 'Genres' },
	{ id: 4, imageUrl: Movies, tittle: 'Movies' },
	{ id: 5, imageUrl: TvShow, tittle: 'TvShow' },
	{ id: 6, imageUrl: WatchLater, tittle: 'WatchLater' },
]

export {
	menuList
}

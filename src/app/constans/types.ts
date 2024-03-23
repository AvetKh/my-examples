export enum RoutsNames {
	Home = 'Home',
	Search = 'Search',
	TvShow = 'TvShow',
	Movies = 'Movies',
	Genres = 'Genres',
	WatchLater = 'WatchLater'
}


type RoutNames = 'Home' | 'Search' | 'TvShow' | 'Movies' | 'Genres' | 'WatchLater'
type RoutTittles = 'Home' | 'Search' | 'Tv Show' | 'Movies' | 'Genres' | 'Watch Later'
type MenuList = {
	id: number, imageUrl: string, tittle: RoutTittles
}[]


export type {
	MenuList,
	RoutNames,
	RoutTittles,
}
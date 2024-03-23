import { UserRes } from "../slices/userSlice";


type Product = {
	id: number;
	title: string;
	description: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	brand: string;
	category: string;
	thumbnail: string;
	images: string[];
}
type ProductsByCategoryResponse = {
	products: Product []
	total: number;
	skip: number;
	limit: number;
}
type GetParams = {
	categoryName: string
}


type AuthBody = { username: string, password: string }
type AuthResponse = UserRes;

type SearchResponse = ProductsByCategoryResponse

export type {
	AuthBody,
	Product,
	GetParams,
	AuthResponse,
	SearchResponse,
	ProductsByCategoryResponse
}
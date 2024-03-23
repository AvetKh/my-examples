import { api } from "./_api.root";
import { AuthBody, AuthResponse } from "./types";


export const authApi = api.injectEndpoints({
	endpoints: (build) => ( {
		login: build.mutation<AuthResponse, AuthBody>({
			query: ({ username, password }) => ( {
				method: 'post',
				url: 'auth/login',
				body: {
					username, password
				}
			} )
		})
	} )
})

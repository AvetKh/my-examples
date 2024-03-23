import { createApi, fetchBaseQuery, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query/react';
import Constants from 'expo-constants';


const isDevMode = 'dev' === Constants.expoConfig?.extra?.appStage;

const baseQuery = fetchBaseQuery(
	{
		baseUrl: Constants.expoConfig?.extra?.apiBaseUrl,
		prepareHeaders: (headers, /*{ getState }*/) => {
			//This part is needed to transmit headers
			
			// const state = getState() as RootState;
			// headers.set('content-language', `${state.user.language}`)
			// headers.set('user-agent', 'mobile')
			// set basked session id if one is not set already
			
			// if (state.user.accessToken) {
			// 	headers.set('authorization', `Bearer ${state.user.accessToken.token}`)
			// }
			return headers;
		},
		validateStatus: (response) => {
			return response?.status <= 202
		}
	},
)

const staggeredBaseQuery = retry(baseQuery, {
	
	// if status is NOT 200 then service is not available, try few more times.
	retryCondition(error: FetchBaseQueryError, args, options) {
		isDevMode && console.log('Received error: ', error.status, error.data)
		return ( ( error.status as any ) > 200 ) && options.attempt < 3
	},
})

export const api = createApi({
	tagTypes: ['Categories', 'Products'],
	refetchOnReconnect: true,
	baseQuery: staggeredBaseQuery,
	endpoints: (build) => ( {
		resetLocalizedContent: build.mutation<null, void>({
			queryFn: () => ( { data: null } ),
		}),
		resetUserContent: build.mutation<null, void>({
			queryFn: () => ( { data: null } ),
		}),
	} ),
});

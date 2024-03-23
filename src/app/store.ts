import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'

import { api } from "./api";

import userSlice from "./slices/userSlice";
import searchSlice from "./slices/searchSlice";
import productSlice from "./slices/productSlice";


export const store = configureStore({
	reducer: {
		user: userSlice,
		search: searchSlice,
		product: productSlice,
		[api.reducerPath]: api.reducer
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
			getDefaultMiddleware: true,
		}).concat(api.middleware),
	
});
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
	RootState,
	unknown,
	Action<string>>;

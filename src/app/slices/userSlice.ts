import * as SecureStore from 'expo-secure-store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Language } from "../../assets/i18n";
import { RootState } from "../store";


const SETTINGS_KEY = "UserSettings__@@@l1"

export type UserRes = {
	email: string
	firstName: string,
	gender: string,
	id: number,
	image: string,
	lastName: string,
	token: string
	username: string
}

type UserState = {
	language?: Language;
	accessToken?: {
		token: string;
		email: string;
		userId: number;
		exp: number;
	};
	username?: string,
	firstName?: string,
	lastName?: string,
	gender?: string,
	image?: string,
}

const initialState: UserState = {
	language: 'en',
}

function parseProfileFromToken(token: string): any {
	const profileBase64 = token.split('.')[1];
	const profileString = Buffer.from(profileBase64, 'base64').toString();
	return JSON.parse(profileString);
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearTokens(state) {
			state.accessToken = undefined;
		},
		updateAccessToken(state, action: PayloadAction<string>) {
			state.accessToken = {
				...parseProfileFromToken(action.payload),
				token: action.payload
			};
		},
		update(state: UserState, action: { payload: UserRes }) {
			const settings = action.payload
			state.accessToken = {
				token: settings?.token,
				email: settings.email,
				userId: settings.id,
				exp: 1
			}
			state = { ...state, ...settings };
			if (!settings.lastName) state.language = 'en'
		},
		
	},
})

export const updateUserSettings = createAsyncThunk<void, UserRes>(
	'updateUserSettings',
	async (settings, { dispatch, getState }) => {
		dispatch(userSlice.actions.update(settings))
		await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify(( getState() as RootState ).user))
	});

export const userLoggedOut = createAsyncThunk('userLoggedOut', async (_, { dispatch, getState }) => {
	
	dispatch(userSlice.actions.clearTokens())
});
export const selectUserLoggedInState = ( (state: RootState) => Boolean(state.user.accessToken) )

export default userSlice.reducer

import * as SecureStore from 'expo-secure-store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Language } from "../../assets/i18n";
import { RootState } from "../store";


const SETTINGS_KEY = "UserSettings__@@@l1"

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
	refreshToken?: string;
}

const initialState: UserState = {
	language: 'en',
}

function parseProfileFromToken(token: string): any {
	const profileBase64 = token.split('.')[1];
	const profileString = Buffer.from(profileBase64, 'base64').toString();
	// console.log(profileString)
	return JSON.parse(profileString);
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		clearTokens(state) {
			delete state.accessToken;
			delete state.refreshToken;
		},
		updateAccessToken(state, action: PayloadAction<string>) {
			state.accessToken = {
				...parseProfileFromToken(action.payload),
				token: action.payload
			};
		},
		update(state, action: PayloadAction<Partial<UserState>>) {
			const settings = action.payload
			state = settings
			if (!settings.lastName) state.language = 'en'
		}
	},
})

export const updateUserSettings = createAsyncThunk<void, Partial<Omit<UserState, 'accessToken'>>>(
	'updateUserSettings',
	async (settings, { dispatch, getState }) => {
		dispatch(userSlice.actions.update(settings))
		await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify(( getState() as RootState ).user))
	});

export const userLoggedOut = createAsyncThunk('userLoggedOut', async (_, { dispatch }) => {
	dispatch(userSlice.actions.clearTokens())
	await dispatch(updateUserSettings({}))
});
export const { updateAccessToken } = userSlice.actions;
export const selectUserLoggedInState = (state: RootState) => Boolean(state.user.refreshToken)

export default userSlice.reducer

import * as SecureStore from 'expo-secure-store';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Currency, Language } from "@assets/i18n";
import { RootState } from "../store";
import { uuidv4 } from "@common/util";
import { Platform } from "react-native";
import { Buffer } from "buffer";

const SETTINGS_KEY = "UserSettingsV2"
const BASKET_SESSION_KEY = "BasketSessionV2"

type UserState = {
    accessToken?: {
        token: string;
        email: string;
        phone: string;
        iat: number;
        exp: number;
        userId: number;
    };
    refreshToken?: string;
    email?: string;
    language: Language;
    currency: Currency;
    basketSessionId?: string;
}

const initialState: UserState = {
    language: 'hy',
    currency: 'AMD'
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
            settings.basketSessionId && (state.basketSessionId = settings.basketSessionId);
            settings.language && (state.language = settings.language);
            settings.currency && (state.currency = settings.currency);
            settings.refreshToken && (state.refreshToken = settings.refreshToken);
            settings.email && (state.email = settings.email);
        },
        updateUserPhone(state, action: PayloadAction<string>) {
            if (state.accessToken) {
                state.accessToken.phone = action.payload;
            }
        }
    },
})

export async function getOrGenerateUniqueSessionId(): Promise<string> {
    if (Platform.OS !== 'android') {
        let id = await SecureStore.getItemAsync(BASKET_SESSION_KEY)

        if (!id) {
            id = Platform.OS + '-' + Platform.Version + '-' + uuidv4();
            await SecureStore.setItemAsync(BASKET_SESSION_KEY, id);
        }

        return id;
    }

    const id = Platform.OS + '-' + Platform.Version + '-' + uuidv4();
    await SecureStore.setItemAsync(BASKET_SESSION_KEY, id);

    return id;
}

export const loadProfile = createAsyncThunk<UserState>(
    'load',
    async (_, {dispatch}) => {
        const settings = await SecureStore.getItemAsync(SETTINGS_KEY);
        let userState: UserState
        if (settings) {
            userState = JSON.parse(settings);
        } else {
            userState = {
                language: 'hy',
                currency: 'AMD',
            }
        }
        if (!userState.basketSessionId) {
            userState.basketSessionId = await getOrGenerateUniqueSessionId();
        }
        dispatch(userSlice.actions.update(userState));
        return userState;
    });

export const updateUserSettings = createAsyncThunk<void, Partial<Omit<UserState, 'accessToken'>>>(
    'updateUserSettings',
    async (settings, {dispatch, getState}) => {
        dispatch(userSlice.actions.update(settings))
        await SecureStore.setItemAsync(SETTINGS_KEY, JSON.stringify((getState() as RootState).user))
    });

export const userLoggedOut = createAsyncThunk('userLoggedOut', async (_, {dispatch}) => {
    dispatch(userSlice.actions.clearTokens())
    await dispatch(updateUserSettings({}))
});

export const {updateAccessToken} = userSlice.actions;

export const selectUserLoggedInState = (state: RootState) => Boolean(state.user.refreshToken)

export default userSlice.reducer

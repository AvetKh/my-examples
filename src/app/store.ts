import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import bootSlice from "./slices/bootSlice";
import userSlice from "./slices/userSlice";
import { api } from "./api";
import basketSlice from './slices/basketSlice';
import favoritesSlice from './slices/favoritesSlice';
import screensSlice from './slices/screensSlice';
import shoppingWorldSlice from "./slices/shoppingWorldSlice";
import modalsSlice from "./slices/modalsSlice";
import NetworkStatusSlice from './slices/ networkStatusSlice';
import searchSlice from "@slices/searchSlice";

export const store = configureStore({
    reducer: {
        boot: bootSlice,
        user: userSlice,
        basket: basketSlice,
        favorites: favoritesSlice,
        search: searchSlice,
        screens: screensSlice,
        sw: shoppingWorldSlice,
        modals: modalsSlice,
        networkStatus: NetworkStatusSlice,
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

// export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

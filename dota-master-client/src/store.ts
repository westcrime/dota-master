import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { fetchSteamProfileSliceReducer, watchFetchSteamProfile } from "@components/steam-profile-card/store/fetch-steam-profile";

const rootReducer = combineReducers({
  fetchSteamProfile: fetchSteamProfileSliceReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchSteamProfile);

export default store;
export type RootState = ReturnType<typeof store.getState>;

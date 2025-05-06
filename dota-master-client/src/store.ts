import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import { fetchSteamProfileSliceReducer, watchFetchSteamProfile } from "@components/steam-profile-card/store/fetch-steam-profile";
import { fetchProfileBasicInfoSliceReducer, watchFetchProfileBasicInfo } from "./components/profile-header/store/fetch-basic-info";

const rootReducer = combineReducers({
  fetchSteamProfile: fetchSteamProfileSliceReducer,
  fetchProfileBasicInfo: fetchProfileBasicInfoSliceReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchSteamProfile);
sagaMiddleware.run(watchFetchProfileBasicInfo);

export default store;
export type RootState = ReturnType<typeof store.getState>;

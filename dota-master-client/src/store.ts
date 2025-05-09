import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import {
  fetchSteamProfileSliceReducer,
  watchFetchSteamProfile,
} from "@components/steam-profile-card/store/fetch-steam-profile";
import {
  fetchProfileBasicInfoSliceReducer,
  watchFetchProfileBasicInfo,
} from "./components/profile/components/profile-header/store/fetch-basic-info";
import { fetchRecordsSliceReducer, watchFetchRecords } from "./components/profile/components/records/store/fetch-records";
import { fetchHeroPerfomanceSliceReducer, watchFetchHeroPerfomance } from "./components/profile/components/perfomance/store/fetch-perfomance";

const rootReducer = combineReducers({
  fetchSteamProfile: fetchSteamProfileSliceReducer,
  fetchProfileBasicInfo: fetchProfileBasicInfoSliceReducer,
  fetchRecords: fetchRecordsSliceReducer,
  fetchPerfomance: fetchHeroPerfomanceSliceReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchSteamProfile);
sagaMiddleware.run(watchFetchProfileBasicInfo);
sagaMiddleware.run(watchFetchRecords);
sagaMiddleware.run(watchFetchHeroPerfomance);

export default store;
export type RootState = ReturnType<typeof store.getState>;

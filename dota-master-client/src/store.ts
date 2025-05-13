import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import {
  fetchSteamProfileSliceReducer,
  watchFetchSteamProfile,
} from "@src/widgets/steam-profile-card/store/fetch-steam-profile";
import {
  fetchProfileBasicInfoSliceReducer,
  watchFetchProfileBasicInfo,
} from "./pages/profile/components/profile-header/store/fetch-basic-info";
import {
  fetchRecordsSliceReducer,
  watchFetchRecords,
} from "./pages/profile/components/records/store/fetch-records";
import {
  fetchHeroPerfomanceSliceReducer,
  watchFetchHeroPerfomance,
} from "./pages/profile/components/perfomance/store/fetch-perfomance";
import {
  fetchMatchBasicInfoSliceReducer,
  watchFetchMatchBasicInfo,
} from "./pages/matches/store/fetch-matches";
import {
  fetchHeroesOpendotaSliceReducer,
  watchFetchHeroesOpendota,
} from "./shared/ui/heroes-opendota-select/store/fetch-heroes-opendota";

const rootReducer = combineReducers({
  fetchSteamProfile: fetchSteamProfileSliceReducer,
  fetchProfileBasicInfo: fetchProfileBasicInfoSliceReducer,
  fetchRecords: fetchRecordsSliceReducer,
  fetchPerfomance: fetchHeroPerfomanceSliceReducer,
  fetchMatches: fetchMatchBasicInfoSliceReducer,
  fetchHeroesOpendota: fetchHeroesOpendotaSliceReducer,
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
sagaMiddleware.run(watchFetchMatchBasicInfo);
sagaMiddleware.run(watchFetchHeroesOpendota);

export default store;
export type RootState = ReturnType<typeof store.getState>;

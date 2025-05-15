import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import {
  fetchSteamProfileSliceReducer,
  watchFetchSteamProfile,
} from "@src/shared/store/fetch-steam-profile";
import {
  fetchProfileBasicInfoSliceReducer,
  watchFetchProfileBasicInfo,
} from "@features/rank-card/store/fetch-basic-info";
import {
  fetchRecordsSliceReducer,
  watchFetchRecords,
} from "@features/records/store/fetch-records";
import {
  fetchHeroPerfomanceSliceReducer,
  watchFetchHeroPerfomance,
} from "@features/perfomance/store/fetch-perfomance";
import {
  fetchMatchBasicInfoSliceReducer,
  watchFetchMatchBasicInfo,
} from "@features/matches/store/fetch-matches";
import {
  fetchHeroesOpendotaSliceReducer,
  watchFetchHeroesOpendota,
} from "./features/heroes-opendota-select/store/fetch-heroes-opendota";
import {
  fetchMatchSliceReducer,
  watchFetchMatch,
} from "./features/match-analysis/store/fetch-match";
import {
  fetchHeroesSliceReducer,
  watchFetchHeroes,
} from "./shared/store/fetch-heroes";

const rootReducer = combineReducers({
  fetchSteamProfile: fetchSteamProfileSliceReducer,
  fetchProfileBasicInfo: fetchProfileBasicInfoSliceReducer,
  fetchRecords: fetchRecordsSliceReducer,
  fetchPerfomance: fetchHeroPerfomanceSliceReducer,
  fetchMatches: fetchMatchBasicInfoSliceReducer,
  fetchHeroesOpendota: fetchHeroesOpendotaSliceReducer,
  fetchMatch: fetchMatchSliceReducer,
  fetchHeroes: fetchHeroesSliceReducer,
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
sagaMiddleware.run(watchFetchMatch);
sagaMiddleware.run(watchFetchHeroes);

export default store;
export type RootState = ReturnType<typeof store.getState>;

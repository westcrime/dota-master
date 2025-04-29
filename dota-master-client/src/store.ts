import { combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  createSpecialization: createSpecializationSliceReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchFetchSpecializations);

export default store;
export type RootState = ReturnType<typeof store.getState>;

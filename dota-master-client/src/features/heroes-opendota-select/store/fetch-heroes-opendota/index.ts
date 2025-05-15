import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import handleError, { ApiError } from "@shared/lib/handleError";
import { AxiosResponse } from "axios";
import {
  CallEffect,
  PutEffect,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import HeroModel from "../../../../shared/models/hero";
import heroesApi from "../../api/heroes";

interface FetchHeroesOpendotaState {
  loading: boolean;
  error?: string;
  data?: HeroModel[];
}

const initialState: FetchHeroesOpendotaState = {
  loading: false,
};

const fetchHeroesOpendotaSlice = createSlice({
  name: "FetchHeroesOpendotaSlice",
  initialState,
  reducers: {
    fetchHeroesOpendotaRequest: (state) => {
      state.loading = true;
    },
    fetchHeroesOpendotaSuccess: (state, action: PayloadAction<HeroModel[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHeroesOpendotaFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.data = undefined;
    },
    resetState: (state) => {
      state.loading = false;
      state.error = undefined;
      state.data = undefined;
    },
  },
});

export const { fetchHeroesOpendotaRequest, resetState } =
  fetchHeroesOpendotaSlice.actions;
export const fetchHeroesOpendotaSliceReducer = fetchHeroesOpendotaSlice.reducer;

type ApiResponse = AxiosResponse<HeroModel[]>;

function* fetchHeroesOpendota(): Generator<
  CallEffect<AxiosResponse> | PutEffect,
  void,
  ApiResponse
> {
  try {
    const response: ApiResponse = yield call(heroesApi.get);
    yield put(
      fetchHeroesOpendotaSlice.actions.fetchHeroesOpendotaSuccess(response.data)
    );
  } catch (error) {
    yield put(
      fetchHeroesOpendotaSlice.actions.fetchHeroesOpendotaFailure(
        handleError(error as ApiError)
      )
    );
  }
}

function* watchFetchHeroesOpendota() {
  yield takeLatest(
    fetchHeroesOpendotaSlice.actions.fetchHeroesOpendotaRequest.type,
    fetchHeroesOpendota
  );
}

export { watchFetchHeroesOpendota };

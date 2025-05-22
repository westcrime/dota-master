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
import HeroModel from "@shared/models/hero";
import heroesApi from "../../api/heroes";

interface FetchHeroesState {
  loading: boolean;
  error?: string;
  data?: HeroModel[];
}

const initialState: FetchHeroesState = {
  loading: false,
};

const fetchHeroesSlice = createSlice({
  name: "FetchHeroesSlice",
  initialState,
  reducers: {
    fetchHeroesRequest: (state) => {
      state.loading = true;
    },
    fetchHeroesSuccess: (state, action: PayloadAction<HeroModel[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHeroesFailure: (state, action) => {
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

export const { fetchHeroesRequest, resetState } =
  fetchHeroesSlice.actions;
export const fetchHeroesSliceReducer = fetchHeroesSlice.reducer;

type ApiResponse = AxiosResponse<HeroModel[]>;

function* fetchHeroes(): Generator<
  CallEffect<AxiosResponse> | PutEffect,
  void,
  ApiResponse
> {
  try {
    const response: ApiResponse = yield call(heroesApi.get);
    yield put(
      fetchHeroesSlice.actions.fetchHeroesSuccess(response.data)
    );
  } catch (error) {
    yield put(
      fetchHeroesSlice.actions.fetchHeroesFailure(
        handleError(error as ApiError)
      )
    );
  }
}

function* watchFetchHeroes() {
  yield takeLatest(
    fetchHeroesSlice.actions.fetchHeroesRequest.type,
    fetchHeroes
  );
}

export { watchFetchHeroes };

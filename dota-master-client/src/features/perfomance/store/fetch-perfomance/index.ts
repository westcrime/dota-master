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
import profileApi from "@src/features/perfomance/api/profile";
import HeroPerfomanceModel from "../../models/heroPerfomance";

interface FetchHeroPerfomanceState {
  loading: boolean;
  error?: string;
  data?: HeroPerfomanceModel[];
}

const initialState: FetchHeroPerfomanceState = {
  loading: false,
};

const fetchHeroPerfomanceSlice = createSlice({
  name: "FetchHeroPerfomanceSlice",
  initialState,
  reducers: {
    fetchHeroPerfomanceRequest: (state) => {
      state.loading = true;
    },
    fetchHeroPerfomanceSuccess: (
      state,
      action: PayloadAction<HeroPerfomanceModel[]>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchHeroPerfomanceFailure: (state, action) => {
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

export const { fetchHeroPerfomanceRequest, resetState } =
  fetchHeroPerfomanceSlice.actions;
export const fetchHeroPerfomanceSliceReducer = fetchHeroPerfomanceSlice.reducer;

type ApiResponse = AxiosResponse<HeroPerfomanceModel[]>;

function* fetchHeroPerfomance(): Generator<
  CallEffect<AxiosResponse> | PutEffect,
  void,
  ApiResponse
> {
  try {
    const response: ApiResponse = yield call(profileApi.get);
    yield put(
      fetchHeroPerfomanceSlice.actions.fetchHeroPerfomanceSuccess(response.data)
    );
  } catch (error) {
    yield put(
      fetchHeroPerfomanceSlice.actions.fetchHeroPerfomanceFailure(
        handleError(error as ApiError)
      )
    );
  }
}

function* watchFetchHeroPerfomance() {
  yield takeLatest(
    fetchHeroPerfomanceSlice.actions.fetchHeroPerfomanceRequest.type,
    fetchHeroPerfomance
  );
}

export { watchFetchHeroPerfomance };

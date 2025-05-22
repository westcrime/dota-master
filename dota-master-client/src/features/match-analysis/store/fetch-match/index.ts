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
import { Match } from "../../models/match";
import matchesApi from "../../api/match";
import { AnyAction } from "redux-saga";

interface FetchMatchState {
  loading: boolean;
  error?: string;
  data?: Match;
}

const initialState: FetchMatchState = {
  loading: false,
};

const fetchMatchSlice = createSlice({
  name: "FetchMatchSlice",
  initialState,
  reducers: {
    fetchMatchRequest: (
      state,
      action: PayloadAction<{
        matchId?: number;
      }>
    ) => {
      state.loading = !!action;
    },
    fetchMatchSuccess: (state, action: PayloadAction<Match>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchMatchFailure: (state, action) => {
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

export const { fetchMatchRequest, resetState } = fetchMatchSlice.actions;
export const fetchMatchSliceReducer = fetchMatchSlice.reducer;

type ApiResponse = AxiosResponse<Match>;

function* fetchMatch(
  action: AnyAction
): Generator<CallEffect<AxiosResponse> | PutEffect, void, ApiResponse> {
  try {
    const { matchId } = action.payload;
    const response: ApiResponse = yield call(matchesApi.get, matchId);
    yield put(fetchMatchSlice.actions.fetchMatchSuccess(response.data));
  } catch (error) {
    yield put(
      fetchMatchSlice.actions.fetchMatchFailure(handleError(error as ApiError))
    );
  }
}

function* watchFetchMatch() {
  yield takeLatest(fetchMatchSlice.actions.fetchMatchRequest.type, fetchMatch);
}

export { watchFetchMatch };

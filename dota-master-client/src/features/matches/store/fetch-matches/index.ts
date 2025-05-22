import { createSlice, PayloadAction, AnyAction } from "@reduxjs/toolkit";
import handleError, { ApiError } from "@shared/lib/handleError";
import { AxiosResponse } from "axios";
import {
  CallEffect,
  PutEffect,
  call,
  put,
  takeLatest,
} from "redux-saga/effects";
import profileApi from "@src/features/matches/api/profile";
import MatchBasicInfoModel from "../../models/matchBasicInfo";

interface FetchMatchBasicInfoState {
  loading: boolean;
  error?: string;
  data?: MatchBasicInfoModel[];
}

const initialState: FetchMatchBasicInfoState = {
  loading: false,
};

const fetchMatchBasicInfoSlice = createSlice({
  name: "FetchMatchBasicInfoSlice",
  initialState,
  reducers: {
    fetchMatchBasicInfoRequest: (
      state,
      action: PayloadAction<{
        limit?: number;
        offset?: number;
        heroId?: number;
      }>
    ) => {
      state.loading = !!action;
    },
    fetchMatchBasicInfoSuccess: (
      state,
      action: PayloadAction<MatchBasicInfoModel[]>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchMatchBasicInfoFailure: (state, action) => {
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

export const { fetchMatchBasicInfoRequest, resetState } =
  fetchMatchBasicInfoSlice.actions;
export const fetchMatchBasicInfoSliceReducer = fetchMatchBasicInfoSlice.reducer;

type ApiResponse = AxiosResponse<MatchBasicInfoModel[]>;

function* fetchMatchBasicInfo(
  action: AnyAction
): Generator<CallEffect<AxiosResponse> | PutEffect, void, ApiResponse> {
  try {
    const { limit, offset, heroId } = action.payload;
    const response: ApiResponse = yield call(
      profileApi.get,
      limit,
      offset,
      heroId
    );
    yield put(
      fetchMatchBasicInfoSlice.actions.fetchMatchBasicInfoSuccess(response.data)
    );
  } catch (error) {
    yield put(
      fetchMatchBasicInfoSlice.actions.fetchMatchBasicInfoFailure(
        handleError(error as ApiError)
      )
    );
  }
}

function* watchFetchMatchBasicInfo() {
  yield takeLatest(
    fetchMatchBasicInfoSlice.actions.fetchMatchBasicInfoRequest.type,
    fetchMatchBasicInfo
  );
}

export { watchFetchMatchBasicInfo };

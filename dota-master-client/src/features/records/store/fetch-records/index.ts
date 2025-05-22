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
import RecordsModel from "../../models/records";
import profileApi from "../../api/profile";

interface FetchRecordsState {
  loading: boolean;
  error?: string;
  data?: RecordsModel;
}

const initialState: FetchRecordsState = {
  loading: false,
};

const fetchRecordsSlice = createSlice({
  name: "FetchRecordsSlice",
  initialState,
  reducers: {
    fetchRecordsRequest: (state) => {
      state.loading = true;
    },
    fetchRecordsSuccess: (state, action: PayloadAction<RecordsModel>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchRecordsFailure: (state, action) => {
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

export const { fetchRecordsRequest, resetState } = fetchRecordsSlice.actions;
export const fetchRecordsSliceReducer = fetchRecordsSlice.reducer;

type ApiResponse = AxiosResponse<RecordsModel>;

function* fetchRecords(): Generator<
  CallEffect<AxiosResponse> | PutEffect,
  void,
  ApiResponse
> {
  try {
    const response: ApiResponse = yield call(profileApi.get);
    yield put(fetchRecordsSlice.actions.fetchRecordsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchRecordsSlice.actions.fetchRecordsFailure(
        handleError(error as ApiError)
      )
    );
  }
}

function* watchFetchRecords() {
  yield takeLatest(
    fetchRecordsSlice.actions.fetchRecordsRequest.type,
    fetchRecords
  );
}

export { watchFetchRecords };

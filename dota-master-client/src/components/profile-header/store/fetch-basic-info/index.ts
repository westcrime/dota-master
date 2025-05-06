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
import profileApi from "@components/profile-header/api/profile";
import ProfileBasicInfoModel from "../../models/profileBasicInfo";

interface FetchProfileBasicInfoState {
  loading: boolean;
  error?: string;
  data?: ProfileBasicInfoModel;
}

const initialState: FetchProfileBasicInfoState = {
  loading: false,
};

const fetchProfileBasicInfoSlice = createSlice({
  name: "FetchProfileBasicInfoSlice",
  initialState,
  reducers: {
    fetchProfileBasicInfoRequest: (state) => {
      state.loading = true;
    },
    fetchProfileBasicInfoSuccess: (
      state,
      action: PayloadAction<ProfileBasicInfoModel>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchProfileBasicInfoFailure: (state, action) => {
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

export const { fetchProfileBasicInfoRequest, resetState } =
  fetchProfileBasicInfoSlice.actions;
export const fetchProfileBasicInfoSliceReducer = fetchProfileBasicInfoSlice.reducer;

type ApiResponse = AxiosResponse<ProfileBasicInfoModel>;

function* fetchProfileBasicInfo(): Generator<
  CallEffect<AxiosResponse> | PutEffect,
  void,
  ApiResponse
> {
  try {
    const response: ApiResponse = yield call(profileApi.get);
    yield put(
      fetchProfileBasicInfoSlice.actions.fetchProfileBasicInfoSuccess(
        response.data
      )
    );
  } catch (error) {
    yield put(
      fetchProfileBasicInfoSlice.actions.fetchProfileBasicInfoFailure(
        handleError(error as ApiError)
      )
    );
  }
}

function* watchFetchProfileBasicInfo() {
  yield takeLatest(
    fetchProfileBasicInfoSlice.actions.fetchProfileBasicInfoRequest.type,
    fetchProfileBasicInfo
  );
}

export { watchFetchProfileBasicInfo };

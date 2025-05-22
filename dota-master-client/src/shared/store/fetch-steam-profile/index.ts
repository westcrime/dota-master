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
import SteamProfileModel from "@shared/models/steamProfile";
import profileApi from "@shared/api/profile";

interface FetchSteamProfileState {
  loading: boolean;
  error?: string;
  data?: SteamProfileModel;
}

const initialState: FetchSteamProfileState = {
  loading: false,
};

const fetchSteamProfileSlice = createSlice({
  name: "FetchSteamProfileSlice",
  initialState,
  reducers: {
    fetchSteamProfileRequest: (state) => {
      state.loading = true;
    },
    fetchSteamProfileSuccess: (
      state,
      action: PayloadAction<SteamProfileModel>
    ) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchSteamProfileFailure: (state, action) => {
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

export const { fetchSteamProfileRequest, resetState } =
  fetchSteamProfileSlice.actions;
export const fetchSteamProfileSliceReducer = fetchSteamProfileSlice.reducer;

type ApiResponse = AxiosResponse<SteamProfileModel>;

function* fetchSteamProfile(): Generator<
  CallEffect<AxiosResponse> | PutEffect,
  void,
  ApiResponse
> {
  try {
    const response: ApiResponse = yield call(profileApi.get);
    yield put(
      fetchSteamProfileSlice.actions.fetchSteamProfileSuccess(response.data)
    );
  } catch (error) {
    yield put(
      fetchSteamProfileSlice.actions.fetchSteamProfileFailure(
        handleError(error as ApiError)
      )
    );
  }
}

function* watchFetchSteamProfile() {
  yield takeLatest(
    fetchSteamProfileSlice.actions.fetchSteamProfileRequest.type,
    fetchSteamProfile
  );
}

export { watchFetchSteamProfile };

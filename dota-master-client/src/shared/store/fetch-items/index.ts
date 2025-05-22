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
import Item from "@shared/models/item";
import itemsApi from "../../api/items";

interface FetchItemsState {
  loading: boolean;
  error?: string;
  data?: Item[];
}

const initialState: FetchItemsState = {
  loading: false,
};

const fetchItemsSlice = createSlice({
  name: "FetchItemsSlice",
  initialState,
  reducers: {
    fetchItemsRequest: (state) => {
      state.loading = true;
    },
    fetchItemsSuccess: (state, action: PayloadAction<Item[]>) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchItemsFailure: (state, action) => {
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

export const { fetchItemsRequest, resetState } = fetchItemsSlice.actions;
export const fetchItemsSliceReducer = fetchItemsSlice.reducer;

type ApiResponse = AxiosResponse<Item[]>;

function* fetchItems(): Generator<
  CallEffect<AxiosResponse> | PutEffect,
  void,
  ApiResponse
> {
  try {
    const response: ApiResponse = yield call(itemsApi.get);
    yield put(fetchItemsSlice.actions.fetchItemsSuccess(response.data));
  } catch (error) {
    yield put(
      fetchItemsSlice.actions.fetchItemsFailure(handleError(error as ApiError))
    );
  }
}

function* watchFetchItems() {
  yield takeLatest(fetchItemsSlice.actions.fetchItemsRequest.type, fetchItems);
}

export { watchFetchItems };

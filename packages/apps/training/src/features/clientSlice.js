import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  generateInifiniteScrollCases,
  handlerApiCall,
} from '@axelor/aos-mobile-core';
import {searchClient, getClientsCategory} from '../api/client-api';

export const fetchClients = createAsyncThunk(
  'clientTraining/fetchClients',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchClient,
      data,
      action: 'Training_SliceAction_FetchClients',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

export const fetchClientsCategories = createAsyncThunk(
  'clientTraining/fetchClientsCategories',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: getClientsCategory,
      data,
      action: 'Training_SliceAction_FetchClientsCategories',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingClientList: false,
  moreLoading: false,
  isListEnd: false,
  clientList: [],
  loadingClient: false,
  client: {},
  categories: [],
};

const clientSlice = createSlice({
  name: 'clientTraining',
  initialState,
  extraReducers: builder => {
    generateInifiniteScrollCases(builder, fetchClients, {
      loading: 'loadingClientList',
      moreLoading: 'moreLoading',
      isListEnd: 'isListEnd',
      list: 'clientList',
    });
    builder.addCase(fetchClientsCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const clientTrainingReducer = clientSlice.reducer;

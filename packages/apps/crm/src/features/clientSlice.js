import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {handlerApiCall} from '@aos-mobile/core';
import {searchClient} from '../api/client-api';

export const fetchClients = createAsyncThunk(
  'crm/Client',
  async function (data, {getState}) {
    return handlerApiCall({
      fetchFunction: searchClient,
      data,
      action: 'fetch crm client',
      getState,
      responseOptions: {isArrayResponse: true},
    });
  },
);

const initialState = {
  loadingClient: true,
  moreLoading: false,
  isListEnd: false,
  clientList: [],
};

const clientSlice = createSlice({
  name: 'client',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchClients.pending, (state, action) => {
      if (action.meta.arg.page === 0) {
        state.loadingClient = true;
      } else {
        state.moreLoading = true;
      }
    });
    builder.addCase(fetchClients.fulfilled, (state, action) => {
      state.loadingClient = false;
      state.moreLoading = false;
      if (action.meta.arg.page === 0 || action.meta.arg.page == null) {
        state.clientList = action.payload;
        state.isListEnd = false;
      } else {
        if (action.payload != null) {
          state.isListEnd = false;
          state.clientList = [...state.clientList, ...action.payload];
        } else {
          state.isListEnd = true;
        }
      }
    });
  },
});

export const clientReducer = clientSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';
import type { ILogItem } from '../../types';

type LoggerState = {
  logArray: ILogItem[];
};

const initialState: LoggerState = {
  logArray: [],
};

const loggerSlice = createSlice({
  name: 'logger',
  initialState,
  reducers: {},
});

export const loggerReducer = loggerSlice.reducer;

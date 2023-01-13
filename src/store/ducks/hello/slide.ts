import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';

export interface IHelloState {
  helloMessage: string;
}

const initialState = {
  helloMessage: '',
} as IHelloState;

const helloSide = createSlice({
  name: 'hello',
  initialState,
  reducers: {
    setHelloMessage(state, action: PayloadAction<string>) {
      return {
        ...state,
        helloMessage: action.payload,
      };
    },
  },
});

export const getHelloMessage = (state: RootState) => state.hello.helloMessage;
export const { setHelloMessage } = helloSide.actions;
export default helloSide.reducer;

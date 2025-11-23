import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewGameState {
  value: string;
}

const initialState: NewGameState = {
  value: 'Initial game state',
};

const newGameSlice = createSlice({
  name: 'newGame',
  initialState,
  reducers: {
    updateValue(state, action: PayloadAction<string>) {
      state.value = action.payload;
    },
  },
});

export const { updateValue } = newGameSlice.actions;
export default newGameSlice.reducer;

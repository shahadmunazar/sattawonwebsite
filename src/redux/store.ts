import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
  value: string;
}

const initialState: GameState = {
  value: 'Initial value',
};

const newGameSlice = createSlice({
  name: 'newGame',
  initialState,
  reducers: {
    updateValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { updateValue } = newGameSlice.actions;
export default newGameSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

interface LayoutState {
  items: LayoutItem[];
}

const initialState: LayoutState = {
  items: [],
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    updateLayout: (state, action: PayloadAction<LayoutItem[]>) => {
      state.items = action.payload;
    },
    addComponent: (state, action: PayloadAction<LayoutItem>) => {
      state.items.push(action.payload);
    },
    removeComponent: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.i !== action.payload);
    },
  },
});

export const { updateLayout, addComponent, removeComponent } = layoutSlice.actions;
export default layoutSlice.reducer;


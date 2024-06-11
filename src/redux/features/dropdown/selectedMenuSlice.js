import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: '',
};

export const selectedMenuSlice = createSlice({
  name: "selectedMenu",
  initialState,
  reducers: {
    checkSelectedMenu: (state, action) => {
      state.value = action.payload;
    },
  },
});
export const { checkSelectedMenu } = selectedMenuSlice.actions;
export const selectedMenu = (state) => state.selectedMenu.value;

export default selectedMenuSlice.reducer;

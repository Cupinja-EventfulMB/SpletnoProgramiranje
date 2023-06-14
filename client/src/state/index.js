import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  mode: "light",
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setMode, loginSuccess, logoutSuccess } = authSlice.actions;
export const authReducer = authSlice.reducer;

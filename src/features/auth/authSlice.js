import { createSlice } from "@reduxjs/toolkit";
import { LogIn } from "lucide-react";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      const userData = {
        id: action.payload.id || Date.now(),
        username: action.payload.username || action.payload.name, 
        email: action.payload.email,
      };

      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    },

    register: (state, action) => {
      const userData = {
        id: Date.now(),
        username: action.payload.name, // Register se hamesha name aayega
        email: action.payload.email,
      };

      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;

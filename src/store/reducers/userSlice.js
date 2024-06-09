import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userState = {
  updateState: false,
  loading: false,
  user: null,
  error: null,
  response: null,
  isAuthenticated: false
};

export const loginUser = createAsyncThunk("user/login", async (data) => {
  const response = await axios.post("http://localhost:8080/login", {
    email: data.email,
    password: data.password,
  });
  // localStorage.setItem(('user', JSON.stringify(response.data.response)))
  return response.data.response;
});

export const registerUser = createAsyncThunk("user/register", async (data) => {
  const response = await axios.put("http://localhost:8080/register", {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
  });
  return response.data.response;
});

export const logoutUser = createAsyncThunk("user/logout", async (data) => {
  const response = await axios.get("http://localhost:8080/logout");
  return response.data.response;
});

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
        state.isAuthenticated = false;

      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        // console.log(action.payload)
        state.user = action.payload;
        state.response = "login";
        state.isAuthenticated = true;
        
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthenticated = false;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.response = "register";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.response = "logout";
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
export const { changeStateTrue, changeStateFalse, clearResponse } =
  userSlice.actions;

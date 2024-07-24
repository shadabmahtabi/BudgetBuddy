import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";

const userState = {
  loading: false,
  user: null,
  error: null,
  token: localStorage.getItem("token") || null,
};

export const homepage = createAsyncThunk("user/homepage", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/`);
  // localStorage.setItem('user', JSON.stringify(response.data.response));
  console.log(response.data.response);
  return response.data.response;
});

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/user/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );
      localStorage.setItem('token', JSON.stringify(response.data.response));
      console.log(response.data.response);
      return response.data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk("user/register", async (data) => {
  const response = await axios.post("/user/register", {
    firstname: data.firstname,
    lastname: data.lastname,
    email: data.email,
    password: data.password,
  });
  // localStorage.setItem('user', JSON.stringify(response.data.response));
  console.log(response.data.response);
  return response.data.response;
});

export const logoutUser = createAsyncThunk("user/logout", async () => {
  const response = await axios.get(`${import.meta.env.VITE_APP_URL}/logout`);
  console.log({ response: response });
  // localStorage.removeItem('user');
  return response.data.response;
});

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    signOut(state) {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(homepage.pending, (state) => {
        state.loading = true;
      })
      .addCase(homepage.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.user = action.payload;
        state.response = "login";
      })
      .addCase(homepage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.token = action.payload;
        // state.user = action.payload;
        // state.response = "login";
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log(action.payload);
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
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;
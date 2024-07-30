import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { viewStatement } from "./statementSlice";

const userState = {
  loading: false,
  user: null,
  error: null,
  token: localStorage.getItem("token") || null,
};

export const homepage = createAsyncThunk(
  "user/homepage",
  async (_, thunkAPI) => {
    // Include the second argument, thunkAPI
    try {
      const response = await axiosInstance.get(`/user`);
      thunkAPI.dispatch(viewStatement())
      return response.data.response;
    } catch (error) {
      // console.log(error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.message); // Use error.response.data for consistency
    }
  }
);

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
      localStorage.setItem("token", response.data.response);
      return response.data.response;
    } catch (error) {
      if (error.message === 'Network Error') {
        // console.log(error.message)
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(error.response.data.response);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/user/register", {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });
      localStorage.setItem("token", response.data.response);
      // console.log(response.data.response)
      return response.data.response;
    } catch (error) {
      if (error.message === 'Network Error') {
        // console.log(error.message)
        return thunkAPI.rejectWithValue(error.message);
      } else {
        return thunkAPI.rejectWithValue(error.response.data.response);
      }
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    signOut(state) {
      state.user = null;
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
        state.user = action.payload;
      })
      .addCase(homepage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        if (
          action.payload === "User not found" ||
          action.error.message === "User not found"
        ) {
          state.user = null;
          state.token = null;
          localStorage.removeItem("token");
        }
      });

    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.token = null;
      });

    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.token = null;
      });
  },
});

export const { signOut } = userSlice.actions;
export default userSlice.reducer;

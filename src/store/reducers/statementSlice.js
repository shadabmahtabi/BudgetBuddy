import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";
import { homepage } from "./userSlice";

const statements = {
  loading: false,
  error: null,
  statements: [],
  message: "",
};

export const addStatement = createAsyncThunk(
  "/statement/add",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/statement/add",
        {
          amount: data.amount,
          type: data.type,
          category: data.category,
          description: data.description,
          date: data.date,
        },
        { withCredentials: true }
      );
      thunkAPI.dispatch(homepage())
      //   console.log(response);
      return response.data.response;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const viewStatement = createAsyncThunk(async (_, thunkAPI) => {
  try {
    const response = await axiosInstance.get("/statement/view", {
      withCredentials: true,
    });
    console.log(response);
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response);
  }
});

const statementSlice = createSlice({
  name: "statement",
  initialState: statements,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addStatement.pending, (state) => {
        (state.loading = true), (state.error = null), (state.message = null);
      })
      .addCase(addStatement.fulfilled, (state, action) => {
        (state.loading = false),
          (state.message = action.payload),
          (state.error = null);
      })
      .addCase(addStatement.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.message = null);
      });

    builder
      .addCase(viewStatement.pending, (state) => {
        (state.loading = true), (state.error = null), (state.message = null);
      })
      .addCase(viewStatement.fulfilled, (state, action) => {
        (state.loading = false),
          (state.statements = action.payload),
          (state.error = null);
      })
      .addCase(viewStatement.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.message = null);
      });
  },
});

export const {} = statementSlice.actions;
export default statementSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
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
      thunkAPI.dispatch(homepage());
      // console.log(response);
      return response.data.response;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const viewStatement = createAsyncThunk(
  "/statement/view",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/statement/view", {
        withCredentials: true,
      });
      // console.log(response.data.response);
      return response.data.response;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const deleteStatement = createAsyncThunk(
  "statement/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/statement/delete/${id}`);
      // console.log(response);
      thunkAPI.dispatch(homepage());
      return response.data.response;
    } catch (error) {
      // console.log(error);
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

const statementSlice = createSlice({
  name: "statements",
  initialState: statements,
  reducers: {
    removeStatements(state) {
      state.statements = [];
      state.message = "";
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStatement.pending, (state) => {
        (state.loading = true), (state.error = null), (state.message = "");
      })
      .addCase(addStatement.fulfilled, (state, action) => {
        (state.loading = false),
          (state.message = action.payload),
          (state.error = null);
      })
      .addCase(addStatement.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.message = "");
      });

    builder
      .addCase(viewStatement.pending, (state) => {
        (state.loading = true), (state.error = null), (state.message = "");
      })
      .addCase(viewStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // console.log(action.payload)
        state.statements = action.payload;
        state.message = "Fetched Statements";
      })
      .addCase(viewStatement.rejected, (state, action) => {
        (state.loading = false),
          (state.error = action.payload),
          (state.message = "");
      });
    builder
      .addCase(deleteStatement.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = "";
      })
      .addCase(deleteStatement.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        console.log(action.payload)
        state.message = "Delete Statement";
        state.statements = state.statements.filter(
          (itm) => itm._id != action.payload._id
        )
      })
      .addCase(deleteStatement.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { removeStatements } = statementSlice.actions;
export default statementSlice.reducer;

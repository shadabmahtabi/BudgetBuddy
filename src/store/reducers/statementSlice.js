import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { homepage } from "./userSlice";

const statements = {
  statementLoading: false,
  statementError: null,
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
      return response.data.response;
    } catch (error) {
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
      return response.data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const deleteStatement = createAsyncThunk(
  "statement/delete",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/statement/delete/${id}`);
      thunkAPI.dispatch(homepage());
      return response.data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const updateStatement = createAsyncThunk(
  "statement/update",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.put(
        `/statement/update/${data.id}`,
        data.userData
      );
      thunkAPI.dispatch(homepage());
      return response.data.response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

export const filterStatements = createAsyncThunk(
  "statements/filter",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/statements/filter", data, {
        withCredentials: true,
      });
      return response.data.response;
    } catch (error) {
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
      state.statementError = null;
      state.statementLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addStatement.pending, (state) => {
        (state.statementLoading = true),
          (state.statementError = null),
          (state.message = "");
      })
      .addCase(addStatement.fulfilled, (state, action) => {
        (state.statementLoading = false),
          (state.message = action.payload),
          (state.statementError = null),
          (state.message = "Statement added.");
      })
      .addCase(addStatement.rejected, (state, action) => {
        (state.statementLoading = false),
          (state.statementError = action.payload),
          (state.message = "");
      });

    builder
      .addCase(viewStatement.pending, (state) => {
        (state.statementLoading = true),
          (state.statementError = null),
          (state.message = "");
      })
      .addCase(viewStatement.fulfilled, (state, action) => {
        state.statementLoading = false;
        state.statementError = null;
        state.statements = action.payload;
        state.message = "Statements fetched.";
      })
      .addCase(viewStatement.rejected, (state, action) => {
        (state.statementLoading = false),
          (state.statementError = action.payload),
          (state.message = "");
      });

    builder
      .addCase(deleteStatement.pending, (state) => {
        state.statementLoading = true;
        state.statementError = null;
        state.message = "";
      })
      .addCase(deleteStatement.fulfilled, (state, action) => {
        state.statementLoading = false;
        state.statementError = null;
        state.message = "Statement deleted.";
        state.statements = state.statements.filter(
          (itm) => itm._id != action.payload._id
        );
      })
      .addCase(deleteStatement.rejected, (state, action) => {
        state.statementLoading = false;
        state.statementError = action.payload;
      });

    builder
      .addCase(updateStatement.pending, (state) => {
        state.statementLoading = true;
        state.statementError = null;
        state.message = "";
      })
      .addCase(updateStatement.fulfilled, (state, action) => {
        state.statementLoading = false;
        state.statementError = null;
        state.statements = state.statements.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        });
        state.message = "Statement deleted.";
      })
      .addCase(updateStatement.rejected, (state, action) => {
        state.statementLoading = false;
        state.statementError = action.payload;
      });

    builder
      .addCase(filterStatements.pending, (state) => {
        state.statementLoading = true;
        state.statementError = null;
        state.message = "";
      })

      .addCase(filterStatements.fulfilled, (state, action) => {
        state.statementLoading = false;
        state.statementError = null;
        // console.log(action.payload);
        state.statements = action.payload;
        state.message = "Statements filtered.";
      })
      .addCase(filterStatements.rejected, (state, action) => {
        state.statementLoading = false;
        state.statementError = action.payload || action.error.message;
        state.message = "Something went wrong!";
      });
  },
});

export const { removeStatements } = statementSlice.actions;
export default statementSlice.reducer;

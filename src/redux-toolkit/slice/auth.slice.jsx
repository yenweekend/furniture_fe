import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiAxios from "@/configs/axios";
// Async action to check authentication status

export const verify = createAsyncThunk("auth/verify", async (_, thunkAPI) => {
  try {
    const response = await apiAxios.get("/api/v1/auth/verify", {
      withCredentials: true,
    });
    return response.data.account;
  } catch (error) {
    console.log("--verify error: ", error);
    return thunkAPI.rejectWithValue("Phiên đã hết hạn");
  }
});
export const checkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, thunkAPI) => {
    try {
      const response = await apiAxios.get("/api/v1/auth/me", {
        withCredentials: true,
      });
      return response.data.account;
    } catch (error) {
      return thunkAPI.rejectWithValue("Xác thực thất bại");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isRefreshing: false,
    isLoggedIn: false,
    account: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLogginState: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verify.pending, (state) => {
        state.loading = true;
        state.isRefreshing = false;
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.account = action.payload;
        state.loading = false;
        state.isLoggedIn = true;
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(verify.rejected, (state, action) => {
        state.account = null;
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.isRefreshing = false;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log(action.payload);
        state.account = action.payload;
        state.loading = false;
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.account = null;
        state.loading = false;
        state.error = action.payload;
        state.isLoggedIn = false;
        state.isRefreshing = false;
      });
  },
});

export const { setLogginState } = authSlice.actions;
export default authSlice.reducer;

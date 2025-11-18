import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    input: "",
    result: null,
    historySearch: [],
  },
  reducers: {
    setSearchInput: (state, action) => {
      state.input = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setHistorySearch: (state, action) => {
      state.historySearch = action.payload;
    },
  },
});

export const { setSearchInput, setResult, setHistorySearch } =
  searchSlice.actions;
export default searchSlice.reducer;

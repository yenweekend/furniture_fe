import { createSlice } from "@reduxjs/toolkit";

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    totalOrderPrice: null,
    couponDetail: null,
  },
  reducers: {
    setTotalOrderPrice: (state, action) => {
      state.totalOrderPrice = action.payload;
    },
    setCouponDetail: (state, action) => {
      state.couponDetail = action.payload;
    },
  },
});

export const { setTotalOrderPrice, setCouponDetail } = couponSlice.actions;
export default couponSlice.reducer;

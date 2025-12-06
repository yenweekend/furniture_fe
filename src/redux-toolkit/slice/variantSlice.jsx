import { createSlice } from "@reduxjs/toolkit";
const initialValue = {
    variant: [],
  };
  const variantSlice = createSlice({
    name: "variant",
    initialState: initialValue,
    reducers: {
      addVariant(state, action) {
          state.variant.push(action.payload);
      },
      updateVariantForProduct(state, action){
        // const data = state.variant.filter((item) => item.value != action.payload.value);
        // data.push(action.payload);
        // state.variant = data;
        const idx = state.variant.findIndex((item) => item.value === action.payload.attr_id);
        state.variant[idx].attr_values.push(...action.payload.attr_values);
      },
      removeVariantForProduct(state, action){
        const idx = state.variant.findIndex((item) => item.value === action.payload.attr_id);
        const idx_of_attr_value = state.variant[idx].attr_values.findIndex((e) => e.value === action.payload.attr_value_id);
        state.variant[idx].attr_values.splice(idx_of_attr_value,1);
        if(state.variant[idx].attr_values.length === 0)
        {
          state.variant.splice(idx, 1);
        }
      }
    },
  });
  export default variantSlice.reducer;
  export const { addVariant , updateVariantForProduct, removeVariantForProduct} = variantSlice.actions;
  
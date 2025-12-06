import { createSelector } from "@reduxjs/toolkit"
export const variantSelector = (state) => state.variant.variant
// export const variantMainSelector = createSelector(variantSelector, (variant)=> {
//     return variant.filter((item,index) => {
//         return variant.some((e,idx) => item.value === e.value && index != idx);
//     })
// }) 
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2, // Xem thêm tại mục "Quá trình merge".
};
const authPersistConfig = {
  ...persistConfig,
  key: "auth",
  whitelist: ["isLoggedIn"],
};
import authReducer from "../slice/auth.slice";
import searchReducer from "../slice/search.slice";
import couponReducer from "../slice/coupon.slice";
import cartReducer from "../slice/cart.slice";
const store = configureStore({
  reducer: {
    search: searchReducer,
    coupon: couponReducer,
    cart: cartReducer,
    auth: persistReducer(authPersistConfig, authReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export default store;
export const persistor = persistStore(store);

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import channelReducer from "../features/channelSlice";

// storeの中に、このReact内で共有したい状態（slice）をいくつか用意し、ここで共有する！！！！
export const store = configureStore({
  reducer: {
    user: userReducer,
    channel: channelReducer
  },
});

// TypeScriptでは、dispatchやstateにも型を定義する。以下はテンプレ。
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

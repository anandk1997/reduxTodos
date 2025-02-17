import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoReducer from "./todoSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    todoList: todoReducer,
  },
});

type AppState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

import todoReducer from './todoSlice';
import {
  configureStore
} from "@reduxjs/toolkit";


export const store = configureStore({
  reducer: {
    todoList: todoReducer
  }
});
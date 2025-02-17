import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

type TodoState = Todo[];

const initialState: TodoState = [];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      const newTask: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTask);
    },

    updateTask: (
      state,
      action: PayloadAction<{ id: number; newText: string }>,
    ) => {
      const task = state.find((t) => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.newText;
      }
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      const index = state.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    completeTask: (state, action: PayloadAction<number>) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },

    completeMultipleTodos: (state, action: PayloadAction<number[]>) => {
      const ids = action.payload;
      state.forEach((todo) => {
        if (ids.includes(todo.id)) {
          todo.completed = true;
        }
      });
    },

    markAllCompleted: (state, action: PayloadAction<boolean>) => {
      state.forEach((todo) => {
        todo.completed = action.payload;
      });
    },

    deleteCompletedTasks: (state) => {
      return state.filter((task) => !task.completed);
    },

    sortTasks: (state, action: PayloadAction<"asc" | "desc">) => {
      state.sort((a, b) => {
        if (a.text < b.text) {
          return action.payload === "asc" ? -1 : 1;
        } else if (a.text > b.text) {
          return action.payload === "asc" ? 1 : -1;
        }
        return 0;
      });
    },
  },
});

export const {
  addTask,
  updateTask,
  deleteTask,
  completeTask,
  markAllCompleted,
  deleteCompletedTasks,
  sortTasks,
  completeMultipleTodos,
} = todoSlice.actions;

export default todoSlice.reducer;

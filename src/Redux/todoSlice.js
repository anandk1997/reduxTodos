import {
  createSlice
} from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTask);
    },

    updateTask: (state, action) => {
      const task = state.find((t) => t.id === action.payload.id);
      if (task) {
        task.text = action.payload.newText;
      }
    },

    deleteTask: (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },

    completeTask: (state, action) => {
      const task = state.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },


    completeMultipleTodos: (state, action) => {
      const ids = action.payload;
      state.forEach((todo) => {
        if (ids.includes(todo.id)) {
          todo.completed = true;
        }
      });
    },



    markAllCompleted: (state, action) => {
      const completedStatus = action.payload;
      state.forEach((todo) => {
        todo.completed = completedStatus;
      });
    },

    deleteCompletedTasks: (state) => {
      return state.filter((task) => !task.completed);
    },

    sortTasks: (state, action) => {
      const {
        payload
      } = action;
      state.sort((a, b) => {
        if (a.text < b.text) {
          return payload === "asc" ? -1 : 1;
        } else if (a.text > b.text) {
          return payload === "asc" ? 1 : -1;
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
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  completeTask,
  deleteCompletedTasks,
  deleteTask,
  markAllCompleted,
  sortTasks,
  updateTask,
} from "../Redux/todoSlice";

export const useTodos = () => {
  const tasks = useSelector((state) => state.todoList);
  const dispatch = useDispatch();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const handleUpdateTask = (id, newText) => {
    dispatch(updateTask({ id, newText }));
  };

  const handleDeleteTask = (id) => {
    dispatch(deleteTask(id));
  };

  const handleCompleteTask = (id) => {
    dispatch(completeTask(id));
  };

  const handleMarkAllCompleted = (event) => {
    dispatch(markAllCompleted(event.target.checked));
  };

  const handleDeleteCompletedTasks = () => {
    dispatch(deleteCompletedTasks());
  };

  const handleSortTasks = (sortType) => {
    dispatch(sortTasks(sortType));
  };

  return {
    dispatch,
    newTask,
    setNewTask,
    handleAddTask,
    tasks,
    handleMarkAllCompleted,
    handleUpdateTask,
    handleDeleteTask,
    handleCompleteTask,
    handleDeleteCompletedTasks,
    handleSortTasks,
  };
};

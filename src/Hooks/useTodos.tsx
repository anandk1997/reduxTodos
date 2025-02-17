import { ChangeEvent, useState } from "react";
import {
  addTask,
  completeTask,
  deleteCompletedTasks,
  deleteTask,
  markAllCompleted,
  sortTasks,
  updateTask,
} from "../Redux/todoSlice";
import { useAppDispatch, useAppSelector } from "../Redux/Store";

export const useTodos = () => {
  const tasks = useAppSelector((state) => state.todoList);
  const dispatch = useAppDispatch();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const handleUpdateTask = (id: number, newText: string) => {
    dispatch(updateTask({ id, newText }));
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  const handleCompleteTask = (id: number) => {
    dispatch(completeTask(id));
  };

  const handleMarkAllCompleted = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(markAllCompleted(event.target.checked));
  };

  const handleDeleteCompletedTasks = () => {
    dispatch(deleteCompletedTasks());
  };

  const handleSortTasks = (sortType: "asc" | "desc") => {
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

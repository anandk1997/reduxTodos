import React, { useState } from "react";
import { completeMultipleTodos } from "../Redux/todoSlice";
import TodoItem from "../Components/TodoItem";
import { Button, Form } from "react-bootstrap";
import { useTodos } from "src/Hooks/useTodos";

const TodoList = () => {
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const {
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
  } = useTodos();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(event.target.value);
    const isChecked = event.target.checked;

    if (isChecked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    }
  };

  const handleCompleteSelected = () => {
    dispatch(completeMultipleTodos(selectedIds));
    setSelectedIds([]);
  };

  return (
    <>
      <div className="d-flex justify-content-center flex-column align-items-center vh-100 my-4">
        <form onSubmit={(e) => e.preventDefault()} className="d-flex">
          <Form.Control
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter Todo Name"
          />

          <Button className="w-25 ms-2" onClick={handleAddTask}>
            Add Task
          </Button>
        </form>

        {tasks.length ? (
          <>
            <Form.Check
              type="checkbox"
              label="Mark all as Completed"
              className="mt-3"
              onChange={handleMarkAllCompleted}
            />

            <div>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th></th>
                    <th>Todo ID</th>
                    <th>Todo Name</th>
                    <th>Actions</th>
                    <th>Todo Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks?.map((task) => (
                    <TodoItem
                      key={task.id}
                      task={task}
                      onUpdate={handleUpdateTask}
                      onDelete={handleDeleteTask}
                      onComplete={handleCompleteTask}
                      onChecked={selectedIds.includes(task.id)}
                      onCheckedChange={handleCheckboxChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between">
              <Button
                variant="success"
                onClick={handleCompleteSelected}
                className="ms-2"
              >
                Complete Selected
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteCompletedTasks}
                className="ms-2"
              >
                Delete Completed Tasks
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSortTasks("asc")}
                className="ms-2"
              >
                Sort A-Z
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleSortTasks("desc")}
                className="ms-2"
              >
                Sort Z-A
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default TodoList;

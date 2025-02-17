import React, { ChangeEvent, FormEvent, useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  task: Task;
  onUpdate: (id: number, newText: string) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
  onChecked: boolean;
  onCheckedChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onUpdate,
  onDelete,
  onComplete,
  onChecked,
  onCheckedChange,
}) => {
  const [editMode, setEditMode] = useReducer((show) => !show, false);
  const [newText, setNewText] = useState(task.text);

  const handleUpdateTask = (e: FormEvent) => {
    e.preventDefault();
    onUpdate(task.id, newText);
    setEditMode();
  };

  return (
    <>
      <tr>
        <td>
          {!editMode && (
            <Form.Check
              type="checkbox"
              value={task.id}
              checked={onChecked}
              onChange={onCheckedChange}
            />
          )}
        </td>

        <td>
          <span>{task.id}</span>
        </td>

        {editMode ? (
          <>
            <td>
              <Form.Control
                type="text"
                value={newText}
                onChange={(e) => setNewText(e.target.value)}
              />
            </td>

            <td>
              <Button variant="success" onClick={handleUpdateTask}>
                Save
              </Button>
              <Button
                variant="danger"
                onClick={() => setEditMode()}
                className="ms-2"
              >
                Cancel
              </Button>
            </td>
          </>
        ) : (
          <>
            <td>{task.text}</td>

            <td>
              <AiFillEdit onClick={() => setEditMode()} role="button" />
              <AiFillDelete onClick={() => onDelete(task.id)} role="button" />
              <FaCheck onClick={() => onComplete(task.id)} role="button" />
            </td>
          </>
        )}

        <td className={task.completed ? "text-success" : ""}>
          {task.completed ? "Completed" : "Incomplete"}
        </td>
      </tr>
    </>
  );
};

export default TodoItem;

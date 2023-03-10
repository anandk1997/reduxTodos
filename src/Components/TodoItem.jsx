import React, { useReducer, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";

const TodoItem = ({
  task,
  onUpdate,
  onDelete,
  onComplete,
  onChecked,
  onCheckedChange,
}) => {
  const [editMode, setEditMode] = useReducer((show) => !show, false);
  const [newText, setNewText] = useState(task.text);

  const handleUpdateTask = (e) => {
    e.preventDefault();
    onUpdate(task.id, newText);
    setEditMode(false);
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

        <td className={task.completed ? "text-success" : null}>
          {task.completed ? "Completed" : "Incomplete"}
        </td>
      </tr>
    </>
  );
};

export default TodoItem;

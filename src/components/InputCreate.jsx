import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InputCreate = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) return;

    const payload = {
      title: taskTitle,
    };

    try {
      const response = await fetch("http://localhost:3000/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error creating task");
      }

      setTaskTitle("");
      navigate("/");
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task..."
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default InputCreate;

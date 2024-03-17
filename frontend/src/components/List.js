import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/v1/list/")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      fetch("http://127.0.0.1:8000/api/v1/list/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTodo }), // Assuming your API expects a 'task' field
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos([...todos, data]); // Add the new todo to the list
          setNewTodo(""); // Clear input field
        })
        .catch((error) => console.error("Error adding todo:", error));
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My To-Do List</h1>
      <input
        type="text"
        className="w-full px-3 py-2 border rounded-md mb-2"
        placeholder="Add a new task..."
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={handleAddTodo}
      >
        Add Task
      </button>
      <ul className="mt-4">
        {todos.map((todo, index) => (
          <li key={index} className="mb-2">
            {todo.task}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic cmFkaW46MTIz");

    fetch("http://127.0.0.1:8000/api/v1/tasks/", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    })
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => console.error("Error fetching todos:", error));
  }, []);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", "Basic cmFkaW46MTIz");

      fetch("http://127.0.0.1:8000/api/v1/tasks/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic cmFkaW46MTIz", // Adding authorization header for POST request
        },
        body: JSON.stringify({ title: newTodo }), // Change to send 'title' instead of 'task'
      })
        .then((response) => response.json())
        .then((data) => {
          setTodos([...todos, data]);
          setNewTodo("");
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
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

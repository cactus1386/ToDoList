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

  const handleCheckboxChange = (todoId, isComplete) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === todoId) {
        // Update the is_complete field in the frontend
        todo.is_complete = !isComplete;

        // Update the is_complete field in the backend
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Basic cmFkaW46MTIz");
        myHeaders.append("Content-Type", "application/json");

        fetch(`http://127.0.0.1:8000/api/v1/tasks/${todoId}/`, {
          method: "PUT",
          headers: myHeaders,
          body: JSON.stringify({ is_complete: !isComplete }),
        })
          .then((response) => response.json())
          .then((data) => console.log("Task updated:", data))
          .catch((error) => console.error("Error updating task:", error));
      }
      return todo;
    });
    setTodos(updatedTodos);
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
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center">
            <input
              id={`checkbox-${todo.id}`}
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={todo.is_complete}
              onChange={() => handleCheckboxChange(todo.id, todo.is_complete)}
            />
            <label
              htmlFor={`checkbox-${todo.id}`}
              className={`ms-2 text-lg font-medium ${
                todo.is_complete ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </label>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;

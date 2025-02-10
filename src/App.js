import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, setFilter } from "./redux/todoSlice";
import { FaCheck, FaRegCircle, FaTrashAlt } from "react-icons/fa";

const App = () => {
  const [input, setInput] = useState("");
  const todos = useSelector((state) => state.todos.todos);
  const filter = useSelector((state) => state.todos.filter);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput("");
    }
  };

  const handleFilterChange = (filter) => {
    dispatch(setFilter(filter));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <div className="bg-gradient-to-r from-teal-400 via-green-400 to-blue-500 min-h-screen flex flex-col items-center justify-center py-10">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">To-Do List</h1>

        {/* Вкладки для фільтрації */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-lg transition duration-200 hover:bg-teal-600 ${filter === "all" ? "bg-teal-600 text-white" : "bg-teal-100"}`}
            onClick={() => handleFilterChange("all")}
          >
            Всі
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition duration-200 hover:bg-teal-600 ${filter === "active" ? "bg-teal-600 text-white" : "bg-teal-100"}`}
            onClick={() => handleFilterChange("active")}
          >
            Активні
          </button>
          <button
            className={`px-4 py-2 rounded-lg transition duration-200 hover:bg-teal-600 ${filter === "completed" ? "bg-teal-600 text-white" : "bg-teal-100"}`}
            onClick={() => handleFilterChange("completed")}
          >
            Завершені
          </button>
        </div>

        {/* Форма для додавання нових завдань */}
        <form onSubmit={handleSubmit} className="flex space-x-4 mb-6">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Додайте завдання..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600"
          />
          <button
            type="submit"
            className="bg-teal-600 text-white px-6 py-3 rounded-lg transition duration-200 hover:bg-teal-700 focus:outline-none"
          >
            Додати
          </button>
        </form>

        {/* Список завдань */}
        <ul className="space-y-4">
          {filteredTodos.map((todo) => (
            <li
              key={todo.id}
              className={`flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm transition duration-300 transform ${
                todo.completed ? "bg-green-100" : "bg-gray-50"
              } hover:scale-105`}
            >
              <span
                className={`flex-1 text-lg ${todo.completed ? "line-through text-gray-500" : ""}`}
              >
                {todo.text}
              </span>
              <div className="flex space-x-3">
                {/* Кнопка для зміни статусу завдання */}
                <button
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  className="text-xl text-teal-600 hover:text-teal-700 transition"
                >
                  {todo.completed ? <FaCheck /> : <FaRegCircle />}
                </button>
                {/* Кнопка для видалення завдання */}
                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  className="text-xl text-red-600 hover:text-red-700 transition"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

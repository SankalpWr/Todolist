import React from "react";
import "./App.css";
import { useState } from "react";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (edit) {
      const editTodo = todos.find((i) => i.id === edit);
      const updateTodo = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updateTodo);
      setEdit(0);
      setTodo("");
      return;
    }
    if (todo !== "") {
      setTodos([{ id: `${todo}-${Date.now()}`, todo }, ...todos]);
      setTodo("");
    }
  };
  const handleDelete = (id) => {
    const delTodo = todos.filter((m) => m.id !== id);
    setTodos([...delTodo]);
  };
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEdit(id);
  };
  return (
    <div className="App">
      <div className="container">
        <h1>TODO List</h1>
        <form className="todoForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          ></input>
          <button type="submit">{edit ? "edit" : "add"}</button>
        </form>
        <ul className="listtodo">
          {todos.map((t) => (
            <li className="singleTodo">
              <span className="todotext" key={t.id}>
                {t.todo}
              </span>
              <button onClick={() => handleEdit(t.id)}>edit</button>
              <button onClick={() => handleDelete(t.id)}>delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;

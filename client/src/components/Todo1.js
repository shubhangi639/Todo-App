import React, { useState } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "./Todo.css";

const Todo = () => {
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState("");
  const [todo, setTodo] = useState("");
  const [checkRefresh, setCheckRefresh] = useState(false);

  return (
    <section className="todo">
      <h1 className="heading">Todo List App</h1>
      <AddTodo
        edit={edit}
        editID={editID}
        todo={todo}
        setCheckRefresh={setCheckRefresh}
        setEdit={setEdit}
      />
      <TodoList
        setEdit={setEdit}
        setEditID={setEditID}
        setTodo={setTodo}
        checkRefresh={checkRefresh}
        setCheckRefresh={setCheckRefresh}
      />
    </section>
  );
};

export default Todo;

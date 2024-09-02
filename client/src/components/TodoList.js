import React, { useEffect, useState } from "react";
import Card from "./UI/Card";
import "./TodoList.css";
import axios from "axios";
import Swal from "sweetalert2";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

const TodoList = (props) => {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getData();
  }, [props.checkRefresh]);

  const getData = () => {
    axios
      .get("http://localhost:5000/todos/get/list")
      .then((response) => {
        setTodoList(response.data.todosList);
        props.setCheckRefresh(false);
      })
      .catch((error) => {
        console.log(error.errorMsg);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure you want to delete this todo?",
      showCancelButton: true,
      confirmButtonText: "Delete it",
      confirmButtonColor: "#a22",
      cancelButtonText: "No, Don't Delete",
      cancelButtonColor: "#b032da",
      reverseButtons: true,
      focusCancel: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete("http://localhost:5000/todos/delete/" + id)
          .then((response) => {
            Swal.fire(" ", "Todo deleted successfully", "success");
            getData();
          })
          .catch((error) => {
            Swal.fire("Oops", "Can't delete this todo", "error");
            console.log(error);
          });
      } else {
        Swal.fire(" ", "Your todo is safe", "info");
      }
    });
  };

  return (
    <div className="todo-list">
      <Card>
        <label htmlFor="todo" className="inputLabel">
          My Todos
        </label>
        <div className="border-line"></div>
        {todoList.length > 0 ? (
          todoList.map((todo, index) => (
            <div className="todo-content">
              <p className="to-do">{todo.todo}</p>
              <div className="todo-btn">
                <MdOutlineEdit
                  size={16}
                  className="edit-btn"
                  onClick={() => {
                    props.setEdit(true);
                    props.setEditID(todo._id);
                    props.setTodo(todo.todo);
                  }}
                />
                <RiDeleteBin6Line
                  size={16}
                  className="delete-btn"
                  onClick={() => {
                    handleDelete(todo._id);
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <div className="info">Data not found</div>
        )}
      </Card>
    </div>
  );
};

export default TodoList;

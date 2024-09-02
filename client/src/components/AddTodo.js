import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import validator from "validator";
import Card from "./UI/Card";
import "./AddTodo.css";

import { IoIosList } from "react-icons/io";
import Button from "./UI/Button";

const AddTodo = (props) => {
  const [todo, setTodo] = useState("");
  const [error, setError] = useState({});
  const [edit, setEdit] = useState(false);

  const validation = () => {
    let inputIsValid = true;
    const errorMsg = {};

    if (validator.isEmpty(todo.replace(/\s/g, ""))) {
      inputIsValid = false;
      errorMsg.todoError = "This field is mandatory.";
      setError(errorMsg);
    }

    return inputIsValid;
  };

  useEffect(() => {
    if (props.edit) {
      setTodo(props.todo);
    }
  }, [props.todo]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validation()) {
      let formValues = {
        todo,
      };

      if (props.edit && props.editID) {
        formValues._id = props.editID;
        axios
          .put("http://localhost:5000/todos/update", formValues)
          .then((updatedReponse) => {
            Swal.fire(
              "Congratulations",
              "Todo updated successfully",
              "success"
            );
            props.setCheckRefresh(true);
            props.setEdit(false);
            setTodo("");
          })
          .catch((error) => {
            console.log(error);
            Swal.fire("Oops", error.errorMsg, "error");
          });
      } else {
        axios
          .post("http://localhost:5000/todos/post", formValues)
          .then((response) => {
            if (response.data.success) {
              Swal.fire(
                "Congratulations!",
                "Todo added successfully!",
                "success"
              );
              props.setCheckRefresh(true);
              setTodo("");
            }
          })
          .catch((err) => {
            Swal.fire(
              "Oops!",
              "Something went wrong" + "<br/>" + err.errorMsg,
              "error"
            );
          });
      }
    }
  };

  return (
    <div className="add-todo">
      <Card>
        <label htmlFor="todo" className="inputLabel">
          Create Todo
        </label>
        <div className="border-line"></div>
        <div className="content">
          <div className="inputDiv">
            <div className="iconDiv">
              <span className="iconSpan">
                <IoIosList size={20} className="icon" />
              </span>
            </div>

            <input
              id="todo"
              className="inputBox"
              type="text"
              placeholder="Enter Todo"
              value={todo}
              onChange={(event) => {
                setTodo(event.target.value);
                setError((prevState) => ({ ...prevState, todoError: "" }));
              }}
            />
          </div>
          <Button onClick={handleSubmit}>
            {props.edit ? "Update Todo" : "Add Todo"}
          </Button>
        </div>
        <div className="error">{error.todoError}</div>
        {/* <div
        className="text-red-500 "
        style={{ fontSize: "12px", fontWeight: "normal" }}
      >
        {error.unitCostError && <span>{error.unitCostError}</span>}
      </div> */}
      </Card>
    </div>
  );
};

export default AddTodo;

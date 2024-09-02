const mongoose = require("mongoose");
const Todo = require("../models/model.js");
const express = require("express");

exports.create_todo = (req, res, next) => {
  let todo = new Todo({
    _id: new mongoose.Types.ObjectId(),
    todo: req.body.todo,
  });

  todo
    .save()
    .then((todoData) => {
      res.status(200).json({ insertedTodos: todoData, success: true });
    })
    .catch((error) => {
      res.status(500).json({ errorMsg: error, success: false });
    });
};

exports.update_todo = (req, res, next) => {
  Todo.updateOne(
    { _id: req.body._id },
    {
      $set: {
        todo: req.body.todo,
      },
    }
  )
    .then((updatedTodo) => {
      res.status(200).json({ updatedTodos: updatedTodo, success: false });
    })
    .catch((error) => {
      res.status(500).json({ errorMsg: error, success: false });
    });
};

exports.list_todo = (req, res, next) => {
  Todo.find({})
    .then((todoList) => {
      res.status(200).json({ todosList: todoList, success: true });
    })
    .catch((error) => {
      res.status(500).json({ errorMsg: error, success: false });
    });
};

exports.delete_todo = (req, res, next) => {
  Todo.deleteOne({ _id: req.params.ID })
    .then((deletedTodos) => {
      res.status(200).json({ deletedTodo: deletedTodos, success: true });
    })
    .catch((error) => {
      res.status(500).json({ errorMsg: error, success: false });
    });
};

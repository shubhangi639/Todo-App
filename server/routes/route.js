const express = require("express");

const todoControllers = require("../controllers/controller.js");

const router = express.Router();

router.post("/post", todoControllers.create_todo);

router.put("/update", todoControllers.update_todo);

router.get("/get/list", todoControllers.list_todo);

router.delete("/delete/:ID", todoControllers.delete_todo);

module.exports = router;

import express from "express";

import {createTask, readTask , deleteTask , updateTask} from "../controllers/tasks-controllers.js";

const router = express.Router();

router.post("/createtask", createTask);
router.get("/readtask", readTask);
router.delete("/deletetask/:id", deleteTask);
router.put("/updatetask/:id", updateTask);


export default router;

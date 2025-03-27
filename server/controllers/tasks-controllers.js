import { response } from "express";
import Task from "../models/tasks-model.js";

export const createTask = async (req, res) => {
  const task = {
    task: req.body.task,
    deadline: req.body.deadline,
    isDone: req.body.isDone,
  };

  const newTask = new Task(task);
  try {
    await newTask.save();
    res.status(200).json({ success: true, data: newTask });
  } catch (error) {
    console.log("Error in create task: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const readTask = async (req, res) => {
  const read = await Task.find({});
  console.log(read)   //returns a curser
  res.status(200).json({ success: true, data: read });
}

export const deleteTask = async (req, res) => {
  const id = req.params.id;
  const deleteT = await Task.findByIdAndDelete(id);
  console.log(deleteT)   //returns a curser
  res.send(`deleted task of id ${id}`);
}

export const updateTask = async (req, res) => {
  const id = req.params.id;
  const task = {
    task: req.body.task,
    deadline: req.body.deadline,
    isDone: req.body.isDone,
  };


  try {
    const updatedTask = await Task.findByIdAndUpdate(id, task, {new:true});
    res.status(200).json({ success: true, data: updatedTask });
  } catch (error) {
    console.log("Error in create task: ", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
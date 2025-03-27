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

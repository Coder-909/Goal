import mongoose from 'mongoose';

const task_schema = new mongoose.Schema({
  task: String,
  isDone: Boolean,
  deadline: Date
  
},
{
    timestamps:true
});

const Tasks = mongoose.model('Task', task_schema);
export default Tasks



import mongoose from 'mongoose';

const createSchema = new Schema({
  task: String,
  isDone: Boolean,
  deadline: Date
  
},
{
    timestamps:true
});

  const Create = mongoose.model('Create', createSchema);
export default Create



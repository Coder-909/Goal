import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check'
import { motion } from 'framer-motion';

import './Tasklist.css'

const Tasklist = (props) => {
  const id = props.id;
  const [isChecked, setIsChecked] = useState(props.data.isDone);
  const [isEditing , setIsEditing]= useState(false);
  const [editedTask , setEditedTask]= useState(props.data.task)
  const [isDeleting, setIsDeleting] = useState(false);


 const deleteIconVariants={
  initial : {y:0},
  hover :{scale:1.2},
  clicked :{y:-30 , opacity:0 ,  transition:{duration:0.5}},
 }

  const handleClick = async(isdone) => {
    let updateTask = props.data;
    updateTask['isDone'] = isdone;
    const res = await fetch(`http://localhost:3000/api/updatetask/${id}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify(updateTask)
    });
    const data = await res.json();
    props.handleDelete();
  }

  const handleEdit = async () => {
    const updatedTask = { ...props.data, task: editedTask }; 
    await fetch(`http://localhost:3000/api/updatetask/${props.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
    });
    setIsEditing(false);
    props.handleUpdate(props.id,updatedTask);
    console.log('successfully edited');
};

  const handleDelete = async() =>{
    setIsDeleting(true);

    setTimeout(async() => {
      
      await fetch(`http://localhost:3000/api/deletetask/${id}`,{
        method:"DELETE"
      })
      console.log(props.task, " succefully deleted");
      props.handleDelete(id);
    },300);
  }

  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState);
    handleClick(!isChecked); // Flip the state between true/false
  };

  return (
    <div className={`task flex justify-between items-center ${isChecked ? 'isDone' : ''}`}>
      <div className='flex gap-3 items-center'>
        <div className="checkbox-container" onClick={toggleCheckbox}>
          <div className={`checkbox flex ${isChecked ? 'checked' : ''}`}>
            {isChecked && <CheckIcon style={{ fontSize: 23, color: 'white' }} />} 
          </div>
        </div>
        {isEditing ? (
          <input 
            type="text"
            value={editedTask}
            onChange={(e)=>setEditedTask(e.target.value)}
            className='editInput'
          />
        ) : (
          <div className='taskname'>{props.data.task}</div>
        )}
      </div>    
        
      <div className={`task-btns flex items-center gap-3 `}>
        {!isEditing ? (
          <EditIcon 
          onClick= {()=>{
            setIsEditing(true);
            setEditedTask(props.data.task);
            
          }}
          style={{ fontSize: 30, color: 'white'}}/>
        ) : (
          <button onClick={handleEdit} className='doneBtn'>Done</button>
        )}
        <motion.div
        variants={deleteIconVariants}
        initial='initial'
        animate={isDeleting?"clicked" : "initial"}
        whileHover={"hover"}
        onClick={handleDelete}

        >

        <DeleteIcon  style={{ fontSize: 30, color: 'white' }}/>
        </motion.div>

      </div>
    </div>
  )
}

export default Tasklist

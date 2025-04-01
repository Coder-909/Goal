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

  let deadline = new Date(props.data.deadline);
  let date = deadline.getDate();
  let month = deadline.getMonth();
  let year = deadline.getFullYear();
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const uiDeadline = `${date} ${months[month]}, ${year}`;

  const editIconVariants={
    initial : {scale:1 , rotate:0},
    hover :{scale:1.2 , rotate:10 , transition:{duration:0.3}},
    clicked :{scale:0.9 , rotate:-10 , transition:{duration:0.2}},
   }


 const deleteIconVariants={
  initial : {y:0},
  hover :{scale:1.02},
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
    <motion.div 
    variants={deleteIconVariants}
    initial='initial'
    animate={isDeleting?"clicked" : "initial"}
    whileHover={"hover"}
    

    className={`task flex justify-between items-center ${isChecked ? 'isDone' : ''}`}>
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
        
      <div className={`task-btns flex items-center gap-4 `}>

        {!isEditing && (
           <div className='deadline text-white text-sm'>
            {props.data.deadline ? `Due ${uiDeadline}` : 'No deadline'}
           </div>
        )}

        {!isEditing ? (
          <motion.div
          variants={editIconVariants}
          initial="initial"
          whileHover="hover"
          whileTap="click"
          >

            <EditIcon className='cursor-pointer'
            onClick= {()=>{
              setIsEditing(true);
              setEditedTask(props.data.task);
              
            }}
            style={{ fontSize: 30, color: 'white'}}/>
          </motion.div>
        ) : (
          <button onClick={handleEdit} className='doneBtn'>Done</button>
        )}
  
          <DeleteIcon className='cursor-pointer' onClick={handleDelete}  style={{ fontSize: 30, color: 'white' }}/>
       

      </div>
    </motion.div>
  )
}

export default Tasklist

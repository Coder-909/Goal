import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check'

import './Tasklist.css'

const Tasklist = (props) => {
  const id = props.id;
  const [isChecked, setIsChecked] = useState(props.data.isDone);

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
    props.handleUpdate();
  }

  const handleDelete = async() =>{
    await fetch(`http://localhost:3000/api/deletetask/${id}`,{
      method:"DELETE"
    })
    console.log(props.task, " succefully deleted");
    props.handleUpdate(id);
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
        {props.data.task}
      </div>    
      <div className='flex items-center gap-3'>
        <EditIcon  style={{ fontSize: 30, color: 'white'}}/>
        <DeleteIcon onClick={handleDelete} style={{ fontSize: 30, color: 'white' }}/>
      </div>
    </div>
  )
}

export default Tasklist

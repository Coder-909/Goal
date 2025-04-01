import React, { useRef, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check'

import './Tasklist.css'

const Tasklist = (props) => {
  const id = props.id;
  const [isChecked, setIsChecked] = useState(props.data.isDone);
  const [isEditing , setIsEditing]= useState(false);
  const [editedTask , setEditedTask]= useState(props.data.task)
  // const inputRef=useRef(null);

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
    props.handleUpdate();
    console.log('successfully edited');
};

const focusInput = () => {
  inputRef.current.focus();
};

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
        {isEditing ? (
          <input 
            type="text"
            value={editedTask}
            // ref={inputRef}
            onChange={(e)=>setEditedTask(e.target.value)}
          
          />
        ) : (
          <div>{props.data.task}</div>
        )}
      </div>    
        
      <div className='flex items-center gap-3'>
      <button onClick={handleEdit} className='border rounded-xl bg-blue-800'>Done</button>
        <EditIcon 
        onClick= {()=>{
          // focusInput   
          setIsEditing(true);
          setEditedTask(props.data.task);
          
        }}
        style={{ fontSize: 30, color: 'white'}}/>
        <DeleteIcon onClick={handleDelete} style={{ fontSize: 30, color: 'white' }}/>
      </div>
    </div>
  )
}

export default Tasklist

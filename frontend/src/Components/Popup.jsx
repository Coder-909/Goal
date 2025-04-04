import React, { useState } from 'react'
import './Popup.css'
import {Calendar} from "react-calendar";
import {motion} from 'motion/react';
import CloseIcon from '@mui/icons-material/Close';

const Popup = ({popupShow,setPopupShow,handleCreation}) => {
  const [task, setTask] = useState('');
  const [date,setDate] = useState(new Date());

  const submitHandler=async(e)=>{
    e.preventDefault()
    const goal = {
      task:task,
      deadline:date,
      isDone:false
    }
    const res = await fetch("http://localhost:3000/api/createtask", {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(goal)
    })

    const data = await res.json();
    setTask("");
    handleCreation(data.data);
  }

  return (
    <div>
      <div className={popupShow ? "backdrop" : "backdrop hideBackdrop"}></div>
      <div className={popupShow ? "popup" : "popup hidePopup"}>
        <div className='head'>
          <h1>ADD TASK</h1>
          <CloseIcon className="close-icon" onClick={()=>{
            setPopupShow(false)
          }} style={{ fontSize: 60, color: 'white' }} />
        </div>
        <form onSubmit={(e)=>{
          submitHandler(e)
        }}>
          <label>Task name:</label>
          <input value={task}
            onChange={(e)=>{
              setTask(e.target.value);
            }}
            type="text" 
            placeholder='Enter your task' 
            className='bg-white px-4 py-4 text-xl m-5 rounded'/>
          <label>Deadline:</label>
          <Calendar onChange={setDate} value={date} className="calendar"/>
          <motion.button type="submit" className='submit bg-emerald-600 rounded px-4 py-3 font-semibold text-xl m-5' drag>Add task</motion.button>
        </form>
        
      </div>
    </div>
  )
}

export default Popup

import React, { useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check'

import './Tasklist.css'

const Tasklist = (props) => {
  
  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked((prevState) => !prevState); // Flip the state between true/false
  };

  return (
    <div className='task flex justify-between items-center'>
      
    <div className='flex gap-3 items-center'>
       
    <div className="checkbox-container" onClick={toggleCheckbox}>
      <div className={`checkbox flex ${isChecked ? 'checked' : ''}`}>
        {isChecked && <CheckIcon style={{ fontSize: 23, color: 'white' }} />} 
      </div>
    </div>

     {props.taskName}
    </div>
     
     <div className='flex items-center gap-3'>
    <EditIcon  style={{ fontSize: 30, color: 'white'}}/>
    <DeleteIcon  style={{ fontSize: 30, color: 'white' }}/>

     </div>
    </div>
  )
}

export default Tasklist

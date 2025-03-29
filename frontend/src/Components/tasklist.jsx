import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Tasklist = (props) => {
  return (
    <div className='task'>
    {props.taskName}
    <EditIcon  style={{ fontSize: 30, color: 'white', marginLeft:'8em'}}/>
    <DeleteIcon  style={{ fontSize: 30, color: 'white' }}/>
    </div>
  )
}

export default Tasklist

import React, { useEffect, useState } from 'react'
import './Main.css'
import svg from '../assets/add.svg'
import Tasklist from './Tasklist.jsx';
import axios from 'axios'

const Main = ({navbarShow,setPopupShow}) => {
  const [tasks , settasks]=useState([])

  const handleDelete = (id) => {
    let newTasks = tasks.filter(task => task._id !== id);
    settasks(newTasks);
  }

  const handleCreation = (newTask) => {
    let newTasks = tasks;
    newTasks.push(newTask);
    settasks(newTasks);
  }

  useEffect(async() => {
    let response= await axios.get('http://localhost:3000/api/readtask') 
    const data= response.data
    settasks(data.data)
  }, []);

  const showPopup = () => {
    setPopupShow(true);
  }

  return (
    <div className='ma'>
      <div className='buttons'>
        <button onClick={showPopup} className='button add'><span>Add task</span><img className='plus' src={svg} alt="" /></button>
        <button className='button edit'>Edit</button>
      </div>
      <div className={navbarShow ? 'tasksBox' : 'tasksBox long'}>
        {tasks.map((elem,idx)=>{
          return <Tasklist 
                    handleUpdate={handleDelete} 
                    handleCreation={handleCreation}
                    id={elem._id} 
                    data={elem}/>
        })}
      </div>
    </div>
  )
}

export default Main

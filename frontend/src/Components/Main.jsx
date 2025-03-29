import React, { useEffect, useState } from 'react'
import './Main.css'
import svg from '../assets/add.svg'
import Tasklist from './Tasklist.jsx';
import axios from 'axios'

const Main = () => {

  const [tasks , settasks]=useState([])

  useEffect(async() => {
    let response= await axios.get('http://localhost:3000/api/readtask') 

    const data= response.data
    console.log(data.data);
    settasks(data.data)
    
    
  }, []);
  return (
    <div className='ma'>
      <button  className='add'>Add task <img className='plus' src={svg} alt="" /></button>
      <button  className='edit'>Edit</button>

      <div className='box'>
        {tasks.map((elem,idx)=>{

          return <Tasklist taskName={elem.task}/>
        })}
      </div>


    </div>
  )
}

export default Main

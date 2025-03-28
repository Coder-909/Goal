import React from 'react'
import './Main.css'
import svg from '../assets/add.svg'
import tasklist from './tasklist.jsx';

const Main = () => {
  return (
    <div className='ma'>
      <button  className='add'>Add task <img className='plus' src={svg} alt="" /></button>
      <button  className='edit'>Edit</button>

      <div className='box'>

      </div>


    </div>
  )
}

export default Main

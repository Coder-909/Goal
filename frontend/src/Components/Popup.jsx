import React, { useState } from 'react'
import './Popup.css'

const Popup = () => {

  
const [username, setusername] = useState('');

  const submitHandler=(e)=>{
    e.preventDefault()
    console.log(username);
    setusername('')
      
  }

  return (
    <div className='popup'>
      <h1 className='text-[#6B01BC] text-2xl font-semibold '>ADD TASK</h1>
      <form onSubmit={(e)=>[
        submitHandler(e)
      ]} >
        <input value={username}
        onChange={(e)=>{          
          setusername(e.target.value);          
        }} 
         type="text" placeholder='Enter your task' className='bg-white px-4 py-4 text-xl m-5 rounded'/>
        <button  className='bg-emerald-600 rounded px-4 py-3 font-semibold text-xl m-5'>Add task</button>

      </form>
      
    </div>
  )
}

export default Popup

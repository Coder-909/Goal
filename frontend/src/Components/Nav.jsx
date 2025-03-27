import React from 'react'
import './Nav.css'
import svg from '../assets/menu.svg'
const Nav = () => {
  return (
    <div className='navbar'>
      <div className='flex  gap-15 items-center '>
      <img className='menus' src={svg} alt="" />
      <h2> Goals</h2>
      </div>
      <div className='btn'>
        <button  className='btn1'>INCOMPLETE</button>
        <button  className='btn2  bg-white  text-black'>COMPLETE</button>
      </div>
    </div>
  )
}

export default Nav

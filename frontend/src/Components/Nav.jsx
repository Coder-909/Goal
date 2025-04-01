import React,{useState} from 'react'
import './Nav.css'
import svg from '../assets/menu.svg'

const Nav = ({toggleSideBar,complete,incomplete,toggleComplete,toggleIncomplete}) => {

  return (
    <div className='navbar'>
      <div className='leftSide'>
        <img onClick={toggleSideBar} className='menus' src={svg} alt="" />
        <h2> Goals</h2>
      </div>
      <div className='rightSide btns'>
        <button onClick={toggleIncomplete} className={incomplete && "active"}>INCOMPLETE</button>
        <button onClick={toggleComplete} className={complete && "active"}>COMPLETE</button>
      </div>
    </div>
  )
}

export default Nav;

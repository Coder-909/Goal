import React,{useState} from 'react'
import './Nav.css'
import svg from '../assets/menu.svg'

const Nav = ({toggleSideBar}) => {
  const [complete,setComplete] = useState(false);
  const [incomplete,setIncomplete] = useState(false);

  const toggleComplete = () => {
    setIncomplete(false);
    setComplete(!complete);
  }
  const toggleIncomplete = () => {
    setIncomplete(!incomplete);
    setComplete(false);
  }

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

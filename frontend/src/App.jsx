import React,{useState} from 'react'
import Nav from './Components/Nav'
import Sidebars from './Components/Sidebars'
import Main from './Components/Main'

const App = () => {
  const [navbarShow, setNavbarShow] = useState(true);

  const toggleSideBar=() => {
    setNavbarShow(!navbarShow);
  }

  return (
    <div>
      <Nav toggleSideBar={toggleSideBar}/>
      <Sidebars show={navbarShow}/>
      <Main navbarShow={navbarShow}/>
    </div>
  )
}

export default App

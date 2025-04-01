import React,{useState} from 'react'
import Nav from './Components/Nav'
import Sidebars from './Components/Sidebars'
import Main from './Components/Main'

const App = () => {
  const [navbarShow, setNavbarShow] = useState(true);
  const [complete,setComplete] = useState(false);
  const [incomplete,setIncomplete] = useState(false);

  const toggleSideBar=() => {
    setNavbarShow(!navbarShow);
  }

  const toggleComplete = () => {
      setIncomplete(false);
      setComplete(!complete);
  }

  const toggleIncomplete = () => {
    setIncomplete(!incomplete);
    setComplete(false);
  }

  return (
    <div>
      <Nav
        toggleSideBar={toggleSideBar}
        complete={complete} 
        incomplete={incomplete} 
        toggleComplete={toggleComplete}
        toggleIncomplete={toggleIncomplete}
      />
      <Sidebars show={navbarShow}/>
      <Main complete={complete} incomplete={incomplete} navbarShow={navbarShow}/>
    </div>
  )
}

export default App

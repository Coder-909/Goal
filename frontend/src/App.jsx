import React,{useState} from 'react'
import Nav from './Components/Nav'
import Sidebars from './Components/Sidebars'
import Main from './Components/Main'
import Popup from './Components/Popup'

const App = () => {
  const [navbarShow, setNavbarShow] = useState(true);
  const [popupShow, setPopupShow] = useState(false);

  const toggleSideBar=() => {
    setNavbarShow(!navbarShow);
  }

  return (
    <div>
      <Nav toggleSideBar={toggleSideBar}/>
      <Sidebars show={navbarShow}/>
      <Main setPopupShow={setPopupShow} navbarShow={navbarShow}/>
      <Popup popupShow={popupShow} setPopupShow={setPopupShow}/>
    </div>
  )
}

export default App

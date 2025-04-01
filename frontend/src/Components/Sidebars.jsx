import React from 'react'
import './Sidebars.css'

const Sidebars = ({show,timeFilter,setTimeFilter}) => {
  const handleChange = (e) =>{
    setTimeFilter(e.target.innerText);
    e.className = "side active"
  }

  const Side = ({value}) => {
    let classname = `side ${timeFilter === value ? "active" : ""}`
    return(
      <div onClick={handleChange} className={classname}>
        {value}
      </div>
    )
  }

  return (
    <div className={show ? "Sidebars" : "Sidebars hide"}>
      <Side value='Today'/>
      <Side value='This week'/>
      <Side value='This month'/>
      <Side value='All time'/>
    </div>
  )
}

export default Sidebars

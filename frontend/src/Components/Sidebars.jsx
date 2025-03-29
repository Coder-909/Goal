import React from 'react'
import './Sidebars.css'

const Sidebars = ({show}) => {

  return (
    <div className={show ? "Sidebars" : "Sidebars hide"}>
      <div className='side'>Today</div>
      <div className='side'>This week</div>
      <div className='side'>This month</div>
      <div className='side'>All time</div>
    </div>
  )
}

export default Sidebars

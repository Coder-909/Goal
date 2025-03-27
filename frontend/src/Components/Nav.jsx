import React from 'react'
import"./sidebar.css"

const Nav = () => {
  return (
    <div>
      <div className='flex justify-between w-full h-8em bg-amber-200'>

        <h1>Goals</h1>
        <div>
        <button>Incomplete</button>
        <button>Complete</button>
        </div>
        
      </div>
    </div>
  )
}

export default Nav

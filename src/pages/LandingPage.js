import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'
import './style/landingPage.css'


const LandingPage = () => {
  const [active, setActive] = useState([true, false, false])

  const handleToggle = (index) => {
    
    const updatedActive = active.map((value, i) => {
      if(i === index && value !== true) return !value;
      else if(i !== index && value === true) return !value;
      else return value;
      })
      setActive(updatedActive); 
    }

  return (
    <>
    <div className="movie_nav_container">
      <Link to ="/">
        <button id={0} className={`movie_display_button1 ${active[0] ? 'active' : ''}`}  onClick={e => handleToggle(parseInt(e.target.id)) }>
        Popular </button> 
      </Link>

      <Link to ="topRated" >
        <button id={1} className={`movie_display_button2 ${active[1] ? 'active' : ''}`} onClick={e => handleToggle(parseInt(e.target.id)) }>
        Top Rated </button> 
      </Link>

      <Link to ="upcoming" >
        <button id={2} className={`movie_display_button3 ${active[2] ? 'active' : ''}`} onClick={e => handleToggle(parseInt(e.target.id)) }>
        Upcoming </button> 
      </Link>

    </div>
    <Outlet />
    </>
  )
}

export default LandingPage
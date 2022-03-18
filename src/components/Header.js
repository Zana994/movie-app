import React from 'react'
import { useState } from 'react'
import './style/header.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'


const Header = () => {
    const [inputValue, setinputValue] = useState('')
    const navigate = useNavigate()
    const handleSearchInput = () => {
        navigate(`search=${inputValue}`)
        setinputValue('')
    }
    
    return (
        <>
        <div className="container">
            <div className="input-group">
            <Link to={`search=${inputValue}`} className='input-group-text'>
                <i className="bi bi-search"></i> 
            </Link>
            <input className="form-control" type="text" value={inputValue} placeholder="Search..." onChange= { (e) => setinputValue(e.target.value) } 
            onKeyPress={ (e) => {if(e.key === 'Enter') handleSearchInput()}} />
            </div>

            <div className="favorites_visited">
                <Link to="favorites"> <p> Favorites </p> </Link>
                <span className="line"></span>
                <Link to="visited"> <p> Visited </p> </Link>
            </div>
        </div>
        <Outlet />
        </>
    )
}

export default Header

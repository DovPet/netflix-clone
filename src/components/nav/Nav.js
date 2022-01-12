import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Nav.css"

function Nav() {
    const [show, handleShow] = useState(false)
    const navigate = useNavigate()
    const transitionNavBar = () => {
        window.scrollY > 100 ? handleShow(true) : handleShow(false)
    }

    useEffect(() => {
        window.addEventListener("scroll", transitionNavBar)
        return () => window.removeEventListener('scroll', transitionNavBar)
    },[])

    return (
        <div className={`nav ${show && 'nav__black'}`}>
            <div className="nav__contents">
                <img 
                    onClick={() => navigate('/')}
                    className='nav__logo'
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                    alt=""/>
                <img 
                    onClick={() => navigate('/profile')}
                    className='nav__avatar'
                    src="https://image.shutterstock.com/z/stock-vector-vector-male-face-avatar-logo-template-pictogram-button-round-trendy-flat-icon-with-man-for-426321556.jpg" 
                    alt=""/>
            </div>
        </div>
    )
}

export default Nav

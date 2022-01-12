import React, { useState, useEffect } from 'react'
import './LoginScreen.css'
import SignUpScreen from '../signup/SignUpScreen'

function LoginScreen() {
    const [signIn, setSignIn] = useState(false)
    const [email, setEmail] = useState(null)

    useEffect(() => {
        setEmail(undefined)
    }, [])

    return (
        <div className='loginScreen'>
            <div className="loginScreen__background">
                <img 
                    onClick={() => {
                        setSignIn(false)
                        setEmail(undefined)
                        }}
                    className='loginScreen__logo'
                    src="http://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" 
                    alt="" />
                <button 
                    onClick={() => setSignIn(true)}
                    className="loginScreen__button">
                    Sign In
                </button>
            </div>
            <div className="loginScreen__body">
            {signIn ? (
                <SignUpScreen email={email} setEmail={setEmail}/>
            ) : (
                <>
                    <h1>Unlimited films, Tv programmes and more</h1>
                    <h2>Watch any anywhere, cancel any time</h2>
                    <h3>Ready to watch. come here and login</h3>

                    <div className="loginScreen__input">
                        <form>
                            <input onChange={e => setEmail(e.target.value)} type="email" placeholder='Email Address'/>
                            <button 
                                onClick={() => setSignIn(true)}
                                className="loginScreen__getStarted">GET STARTED</button>
                        </form>
                    </div>
                </>
            )}         
            </div>
        </div>
    )
}

export default LoginScreen

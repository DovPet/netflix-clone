import React, { useState, useRef } from 'react'
import { auth } from '../../firebase'
import './SignUpScreen.css'

function SignUpScreen({email, setEmail}) {

    const [showRegister, setShowRegister] = useState(false)
    const emailRef = useRef(null)
    const passRef = useRef(null)
    const registerPassRef = useRef(null)
    const repeatPassRef = useRef(null)

    const register = e => {
        e.preventDefault()
        if(showRegister){
            if(registerPassRef.current.value !== repeatPassRef.current.value)
            {
                alert('Passwords do not match!')
                return
            }
        }

        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            registerPassRef.current.value
        )
        .then(res => {
        })
        .catch(e => {
            alert(e.message)
        })
    }

    const signIn = e => {
        e.preventDefault()

        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passRef.current.value
        ) 
        .then(res => {
        })
        .catch(e => {
            alert(e.message)
        })
    }

    return (
        <div className='signUpScreen'>
            <form>
            {showRegister ? (
                <>
                    <h1>Register</h1>
                    <input ref={emailRef} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" value={email} />
                    <input ref={registerPassRef} placeholder='Password' type="password" />
                    <input ref={repeatPassRef} placeholder='Repeat Password' type="password" />
                    <button onClick={(e) => register(e)}>Register</button>
                    <h4>
                        <span className='signUpScreen__gray'>Been here before? </span>
                        <span className='signUpScreen__link' onClick={() => setShowRegister(false)}>Login</span>
                    </h4>
                </>
            ) : (
                <>
                    <h1>Sign In</h1>
                    <input ref={emailRef} onChange={e => setEmail(e.target.value)} placeholder='Email' type="email" value={email}/>
                    <input ref={passRef} placeholder='Password' type="password" />
                    <button onClick={(e) => signIn(e)}>Sign In</button>
                    <h4>
                        <span className='signUpScreen__gray'>New to Netflix? </span>
                        <span className='signUpScreen__link' onClick={() => {
                            setShowRegister(true)
                            }}>Sign Up now.</span>
                    </h4>
                </>
            )}              
            </form>
        </div>
    )
}

export default SignUpScreen

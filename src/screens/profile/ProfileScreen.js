import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '../../features/userSlice'
import { auth } from '../../firebase'
import Nav from '../../components/nav/Nav'
import './ProfileScreen.css'
import PlansScreen from '../plans/PlansScreen';

function ProfileScreen() {

    const user = useSelector(selectUser)

    return (
        <div className='profileScreen'>
            <Nav />
            <div className="profileScreen__body">
                <h1>Edit Profile</h1>
                <div className="profileScreen__info">
                    <img src="https://image.shutterstock.com/z/stock-vector-vector-male-face-avatar-logo-template-pictogram-button-round-trendy-flat-icon-with-man-for-426321556.jpg" alt="" />          
                    <div className="profileScreen__details">
                        <h2>{user.email}</h2>
                        <div className="profileScreen__plans">
                            <h3>Plans</h3>
                            <PlansScreen />
                            <button onClick={() => auth.signOut()} className='profileScreen__signOut'>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileScreen

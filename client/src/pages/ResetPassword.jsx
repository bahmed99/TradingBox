import React from 'react'
import Navbar from '../components/Navbar'
import Password from "../components/Password"
// import Footer from '../components/Footer'
import "../assets/css/SignIn.css"


export default function ResetPassword() {
    return(
        <div className='loginPage'>
        <Password/>
        {/* <Footer/> */}
        </div>
        )
}
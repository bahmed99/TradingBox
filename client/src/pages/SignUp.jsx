import React from 'react'
import Navbar from '../components/Navbar'
import Registration from "../components/RegisterForm"
// import Footer from '../components/Footer'
import "../assets/css/SignIn.css"

export default function SignUp() {
    return(
        <div className='loginPage'>
        <Registration/>
        {/* <Footer/> */}
        </div>
        )
}
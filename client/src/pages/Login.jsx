import React from 'react'
import Navbar from '../components/Navbar'
import SignIn from "../components/SignIn"
// import Footer from '../components/Footer'
import "../assets/css/SignIn.css"


export default function Login() {
    return(
        <div className='loginPage'>
        <SignIn/>
        {/* <Footer/> */}
        </div>
        )
}
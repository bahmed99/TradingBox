import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import logo from "../assets/images/logobleu.png"
import '../assets/css/SignIn.css'
import axios from 'axios';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Alert from "react-bootstrap/Alert";
import ReactLoading from "react-loading";
export default function SignIn() {
    const history = useHistory()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordTest, setPasswordTest] = useState(false)
    const [emailTest, setEmailTest] = useState(false)
    const [emailTestMissing, setEmailTestMissing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    function HandleChangeEmail(e) {
        setEmail(e.target.value)
    }
    function Login() {
        if (!password || !email) {
            if (!password) {
                setPasswordTest(true)
                setTimeout(() => setPasswordTest(false), 1500);
            }
            if (!email) {
                setEmailTest(true)
                setEmailTestMissing(true)
                setTimeout(() => setEmailTest(false), 1500);
                setTimeout(() => setEmailTestMissing(false), 2000);
            }
            if ((!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
                setEmailTest(true)
                setTimeout(() => setEmailTest(false), 1500);
            }

        }
        else if ((!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
            setEmailTest(true)
            setTimeout(() => setEmailTest(false), 1500);
        }


        else {
            setLoading(true)
            axios.post('http://localhost:3001/auth/client/login', {
                email: email,
                password: password
            }).then(res => {
                setLoading(false)
                history.push("/home")
                // localStorage.setItem("jwt", res.data.token)


            }).catch(err => {
                setError(true)
                setLoading(false)
                setTimeout(() => setError(false), 1500);

            })
        }
    }
    return (
        <div className="loginContainer">
            <div className="login-header">
                {/* <img src={logo} className="loginLogo"/> */}
                <p className="signUpLink">Don't have an account? <Link to="/signup" className="here">Sign Up</Link> </p>
            </div>
            <div className="login">

                <form className="login-form"  >
                    <Alert

                        show={error}
                        variant={"danger"}
                        style={{ width: "500px", margin: "auto auto" }}
                    >
                        {"Please check your informations"}
                    </Alert>
                    <h1 className="login-heading">Welcome Back</h1>
                    <p className="login-text">We are happy to see you again</p>
                    <div className="field-container -username">


                        <OverlayTrigger 
                            delay={{ show: 250, hide: 400 }}
                            overlay={emailTestMissing === false ? renderTooltip : renderTooltipMissing}
                            show={emailTest}
                            placement="top"
                        >
                            <input type="email" placeholder="Enter your email*" onChange={(e) => HandleChangeEmail(e)} />
                        </OverlayTrigger>

                    </div>
                    <div className="field-container -password">
                        <OverlayTrigger 
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipMissing}
                            show={passwordTest}
                            placement="top"

                        >
                            <input type="password" placeholder="Enter your password*" onChange={(e) => setPassword(e.target.value)} />
                        </OverlayTrigger>
                    </div>
                    <p className="forgotPassword">Forgot your password? Click <Link to="/resetPassword" className="here">here</Link></p>
                    <div className='btn btn-custom btn-lg page-scroll loginBtn' type="submit" onClick={Login} >{loading ? (
                        <ReactLoading
                            height={"20px"}
                            width={"24px"}
                            color="#0283b0" 
                        
                            type="spin"
                        />
                    ) : (
                        "Sign In"
                    )}</div>
                </form>
            </div>
        </div>
    )

}


const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Invalid format
    </Tooltip>
);

const renderTooltipMissing = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Please add all the field
    </Tooltip>
);
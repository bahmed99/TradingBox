import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import logo from "../assets/images/logobleu.png"
import '../assets/css/SignIn.css'
import Alert from "react-bootstrap/Alert";
import ReactLoading from "react-loading";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import axios from 'axios';

export default function Password() {
    const [email, setEmail] = useState("")
    const [emailTest, setEmailTest] = useState(false)
    const [emailTestMissing, setEmailTestMissing] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const history = useHistory()

    function HandleChangeEmail(e) {
        setEmail(e.target.value)
    }
    function Forgot() {

        if (!email) {
            setEmailTest(true)
            setEmailTestMissing(true)
            setTimeout(() => setEmailTest(false), 1500);
            setTimeout(() => setEmailTestMissing(false), 2000);
        }

        else if ((!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))) {
            setEmailTest(true)
            setTimeout(() => setEmailTest(false), 1500);
        }


        else {
            setLoading(true)
            axios.post('http://localhost:3001/auth/client/forgot-password', {
                email: email
            }).then(res => {
                setLoading(false)
                history.push("/codeValidation")


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
                {/* <img src={logo} className="loginLogo" /> */}
                <p className="signUpLink">Don't have an account? <Link to="/signup" className="here">Sign Up</Link> </p>
            </div>
            <div className="login">
                <form className="login-form">
                    <Alert

                        show={error}
                        variant={"danger"}
                        style={{ width: "500px", margin: "auto auto" }}
                    >
                        {"Please check your informations"}
                    </Alert>
                    <h1 className="login-heading">Reset your password
                    </h1>
                    <p className="login-text">Forgot your password ? Enter your email
                        adress and we will send you a reset code !</p>
                    <div className="field-container -username">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={emailTestMissing === false ? renderTooltip : renderTooltipMissing}
                            show={emailTest}
                            placement="top"
                        >
                            <input type="email" name="demo" placeholder="Enter your email*" onChange={(e) => HandleChangeEmail(e)} />
                        </OverlayTrigger>
                    </div>
                    <div className="homeButtom">
                        <div className='btn btn-custom btn-lg page-scroll' onClick={Forgot}

                        >Confirm</div>
                    </div>

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
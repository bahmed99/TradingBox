import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import logo from "../assets/images/logobleu.png"
import '../assets/css/SignIn.css'
import axios from 'axios';
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import ReactLoading from "react-loading";
export default function SignIn() {
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const [code, setCode] = useState("")
    const [passwordTest, setPasswordTest] = useState(false)
    const [passwordConfirmTest, setPasswordConfirmTest] = useState(false)
    const [codeTest, setcodeTest] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [msg, setMsg] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const history = useHistory()

    function Login() {
        if (!password || !passwordConfirm || !code) {
            if (!code) {
                setcodeTest(true)
                setTimeout(() => setcodeTest(false), 1500);

            }
            if (!passwordConfirm) {
                setPasswordConfirmTest(true)
                setTimeout(() => setPasswordConfirmTest(false), 1500);

            }
            if (!password) {
                setPasswordTest(true)
                setTimeout(() => setPasswordTest(false), 1500);

            }



        }
        else if (password !== passwordConfirm) {
            setConfirm(true)
            setPasswordConfirmTest(true)

            setTimeout(() => setConfirm(false), 2000);
            setTimeout(() => setPasswordConfirmTest(false), 1500);

        }


        else {
            setLoading(true)
            axios.post("http://localhost:3001/auth/client/new-password", {
                password: password,
                token: code
            }).then(res => {
                setMsg(true)
                setTimeout(() => setMsg(false), 1500);
                setLoading(false)

            }).catch(err => {
                setError(true)
                setTimeout(() => setError(false), 1500);
                setLoading(false)
            })
        }
    }

    function ReSend() {
        setLoading(true)
        axios.post("http://localhost:3001/auth/client/new-password", {
            password: password,
            token: code
        }).then(res => {
            setMsg(true)
            setTimeout(() => setMsg(false), 1500);
            setLoading(false)

        }).catch(err => {
            setError(true)
            setTimeout(() => setError(false), 1500);
            setLoading(false)

        })

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

                        show={msg}
                        variant={"success"}
                        style={{ width: "500px", margin: "auto auto" }}
                    >
                        {"Password updated"}
                    </Alert>
                    <Alert

                        show={error}
                        variant={"danger"}
                        style={{ width: "500px", margin: "auto auto" }}
                    >
                        {"Session expired"}
                    </Alert>
                    <h1 className="login-heading">Reset code sent
                    </h1>
                    <p className="login-text">Did not recieve the reset mail ? click <Link onClick={ReSend} className="here">here</Link> to resend</p>
                    <div className="field-container -username">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipMissing}
                            show={codeTest}
                            placement="top"
                        >

                            <input type="email" name="demo" placeholder="Reset code*" onChange={(e) => { setCode(e.target.value) }} />
                        </OverlayTrigger>
                    </div>
                    <div className="field-container -password">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipMissing}
                            show={passwordTest}
                            placement="top"
                        >
                            <input type="password" name="demo" placeholder="New password*" onChange={(e) => { setPassword(e.target.value) }} />
                        </OverlayTrigger>
                    </div>
                    <div className="field-container -password">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={confirm === false ? renderTooltipMissing : renderTooltip}
                            show={passwordConfirmTest}
                            placement="top"
                        >
                            <input type="password" name="demo" placeholder="Confirm password*" onChange={(e) => { setPasswordConfirm(e.target.value) }} />
                        </OverlayTrigger>
                    </div>
                    <div className='btn btn-custom btn-lg page-scroll loginBtn' type="submit" onClick={Login}>{loading ? (<ReactLoading
                            height={"20px"}
                            width={"24px"}
                            color="#0283b0" 
                        
                            type="spin"
                        />
                    ) : (
                        "Confirm"
                    )}</div>
                </form>
            </div>
        </div>
    )
}


const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Icompatible passwords
    </Tooltip>
);

const renderTooltipMissing = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Please add all the field
    </Tooltip>
);
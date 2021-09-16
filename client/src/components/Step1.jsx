
import React, { useState } from "react"
import '../assets/css/SignIn.css'
import axios from "axios"
import { OverlayTrigger, Tooltip } from "react-bootstrap";

export default function Step1(props) {
    const [passwordConfirmTest, setPasswordConfirmTest] = useState(false)
    const [emailTest, setEmailTest] = useState(false)
    const [passwordTest, setPasswordtest] = useState(false)
    const [passwordConfirmTestD, setPasswordConfirmTestD] = useState(false)
    const [emailTestD, setEmailTestD] = useState(false)

    const [test, setTest] = useState("")

    const [confirmTest, setConfirmTest] = useState(false)
    function Verification() {
        if (!props.email || !props.password || !props.passwordConfirm) {
            setTest("a")
            if (!props.email) {
                setEmailTestD(true)
                setTimeout(() => setEmailTestD(false), 1500);

            }
            if (!props.password) {
                setPasswordtest(true)
                setTimeout(() => setPasswordtest(false), 1500);

            }
            if (!props.passwordConfirm) {
                setPasswordConfirmTestD(true)
                setTimeout(() => setPasswordConfirmTestD(false), 1500);

            }
            // if ((!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(props.email))) {
            //     setEmailTest(true)
            //     setEmailTestD(true)
            //     setTimeout(() => setEmailTestD(false), 2000);
            //     setTimeout(() => setEmailTest(false), 1500);
            // }

        }
        else {
            setTest("b")
        }
        if (props.password !== props.passwordConfirm) {

            setTest("a")
            setPasswordConfirmTest(true)
            setPasswordConfirmTestD(true)

            setTimeout(() => setPasswordConfirmTest(false), 2000);
            setTimeout(() => setPasswordConfirmTestD(false), 1500);

        }
        else {
            setTest("b")
        }

        if ((!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(props.email))) {
            setEmailTest(true)
            setTest("a")
            setEmailTestD(true)
            setTimeout(() => setEmailTestD(false), 1500);
            setTimeout(() => setEmailTest(false), 2000);
        }

        else {
            setTest("b")
        }
        console.log(test)



        if (test==="b"&& props.password === props.passwordConfirm) {
            axios.post("http://localhost:3001/auth/client/check_mail", { email: props.email }).then(res => {
                setTest("a")
                if (res.data.error === true) {
                    setConfirmTest(true)
                    
                    setEmailTestD(true)
                    setTimeout(() => setEmailTestD(false), 1500);
            
                    setTimeout(() => setConfirmTest(false), 2000);

                }
                else {
                     
                    props.next()
                }
            })
        }


    }


    return (
        <div className="loginContainer">
            <div className="login">
                <div className="login-form">
                    <h1 className="login-heading">We are happy to see
                        you take the plunge!</h1>
                    <p className="login-text">Ready to start? start by entering your
                        email address and password in order to
                        have permanent access to our strategies</p>
                    <div className="field-container -username">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={emailTest === true ? renderTooltipFormat : confirmTest === true ? renderTooltip : renderTooltipMissing}
                            show={emailTestD}
                            placement="top"
                        >
                            <input type="email" placeholder="Enter your email*" onChange={(e) => props.setEmail(e.target.value)} />
                        </OverlayTrigger>
                    </div>
                    <div className="field-container -password">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipMissing}
                            show={passwordTest}
                            placement="top"
                        >
                            <input type="password" placeholder="Enter password*" onChange={(e) => props.setPassword(e.target.value)} />
                        </OverlayTrigger>
                    </div>
                    <div className="field-container -password">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={passwordConfirmTest === true ? renderTooltipConfirm : renderTooltipMissing}
                            show={passwordConfirmTestD}
                            placement="top"
                        >
                            <input type="password" placeholder="Confirm password*" onChange={(e) => props.setPasswordConfirm(e.target.value)} />
                        </OverlayTrigger>
                    </div>
                    <button className='btn btn-custom btn-lg page-scroll loginBtn' onClick={Verification}>Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}

const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        User aleardy exist
    </Tooltip>
);

const renderTooltipConfirm = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Icompatible passwords
    </Tooltip>
);

const renderTooltipMissing = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Please add all the field
    </Tooltip>
);

const renderTooltipFormat = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Format invalid
    </Tooltip>
);
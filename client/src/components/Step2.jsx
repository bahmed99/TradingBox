import React, { useState } from "react"
import '../assets/css/SignIn.css'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import icon from "../assets/images/mortarboard.png"
import axios from "axios"
import { OverlayTrigger, Tooltip } from "react-bootstrap";


export default function SignIn(props) {
    const [portfolio, setPortfolio] = useState(false)
    const [strategy, setStrategy] = useState(false)
    const [size, setSize] = useState(false)

    function Next() {

        if (!props.portfolio_size) {
            setPortfolio(true)
            setTimeout(() => setPortfolio(false), 1500);
        }
        if (props.portfolio_size < 1000 || typeof (props.portfolio_size) !== "number") {
            setSize(true)
            setTimeout(() => setSize(false), 3000);
            setPortfolio(true)
            setTimeout(() => setPortfolio(false), 1000);

        }
        if (props.portfolio_size !== "" && props.portfolio_size >= 1000) {
            props.next()
        }


    }

    function HandleChange(e) {
        props.setPortfolio_size(e.target.value)
        if(e.target.value>100000)
        props.setStrategy_suggestion("option2")
        else props.setStrategy_suggestion("option1")
    
    
    }
    return (
        <div className="loginContainer">
            <div className="login">
                <div className="login-form">
                    <h1 className="login-heading">No subscription fees</h1>
                    <p className="login-text">Ready to start? start by entering your
                        email address and password in order to
                        have permanent access to our strategies</p>
                    <div className="step2Description">
                        <img src={icon} alt="" />
                        <p>
                            Richmond Analytica manages your
                            entire account on the exchange.
                            If you want to trade only part of it,
                            please create sub-account. See how
                        </p>
                    </div>
                    <label className="formLabel">Portfolio size</label>
                    <div className="field-container -username">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={size === false ? renderTooltipMissing : renderTooltipNumber}
                            show={portfolio}
                            placement="top"
                        >
                            <input type="email" placeholder="$ 10000"  onChange={(e) => HandleChange(e)} />
                        </OverlayTrigger>
                    </div>
                    <label className="formLabel">Strategy suggestion</label>
                    <div className="field-container -username">

                        {props.portfolio_size < 100000 ? <select onChange={(e) => props.setStrategy_suggestion(e.target.value)} >
                            <option value="option1" >
                                option1

                            </option>
                            <option value="option2" >
                                option2

                            </option>
                        </select> : <select onChange={(e) => props.setStrategy_suggestion(e.target.value)} >
                            <option value="option2" >
                                option2

                            </option>
                            <option value="option1" >
                                option1

                            </option>
                        </select>}


                    </div>
                    <div className="strategyDescription">
                        <div className="strategy">
                            <HelpOutlineIcon />
                            <p>
                                This strategy was proposed on the basis of the
                                volumes traded on the markets.
                            </p>
                        </div>
                        <div className="strategy">
                            <HelpOutlineIcon />
                            <p >
                                Minimum account size is $1000 in any crypto.
                            </p>
                        </div>
                    </div>
                    <button className='btn btn-custom btn-lg page-scroll loginBtn' onClick={Next}>Next
                    </button>
                </div>
            </div>
        </div>
    )
}

const renderTooltipMissing = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        Please add all the field
    </Tooltip>
);


const renderTooltipNumber = (props) => (
    <Tooltip id="button-tooltip" {...props}>
        {'Field must be a number>=1000$'}
    </Tooltip>
);


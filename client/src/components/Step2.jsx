import React, { useState } from "react"
import '../assets/css/SignIn.css'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import icon from "../assets/images/mortarboard.png"
import axios from "axios"
import { OverlayTrigger, Tooltip } from "react-bootstrap";


export default function SignIn(props) {
    const [portfolio, setPortfolio] = useState(false)
    const [strategy, setStrategy] = useState(false)

    function Next() {
        if(!props.strategy_suggestion){
            setStrategy(true)
            setTimeout(() => setStrategy(false), 1500);
        }
        if(!props.portfolio_size){
            setPortfolio(true)
            setTimeout(() => setPortfolio(false), 1500);
        }
        if(props.strategy_suggestion!=="" && props.portfolio_size!=="" ){
            props.next()
        }

        
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
                            overlay={renderTooltipMissing}
                            show={portfolio}
                            placement="top"
                        >
                            <input type="email" placeholder="$ 10000" onChange={(e) => props.setPortfolio_size(e.target.value)} />
                        </OverlayTrigger>
                    </div>
                    <label className="formLabel">Strategy suggestion</label>
                    <div className="field-container -username">
                        <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipMissing}
                            show={strategy}
                            placement="top"
                        >
                            <input type="email" placeholder="ExpoRL*" onChange={(e) => props.setStrategy_suggestion(e.target.value)} />

                        </OverlayTrigger>
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

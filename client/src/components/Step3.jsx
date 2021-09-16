import React,{useState} from "react"
import '../assets/css/SignIn.css'
import axios from "axios"
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import ReactLoading from "react-loading";
export default function SignIn(props) {

   
    const [api, setApi] = useState(false);
    const [secret, setSecret] = useState(false);
    function Next() {
        if(!props.api){
            setApi(true)
            setTimeout(() => setApi(false), 1500);
        }
        if(!props.secret){
            setSecret(true)
            setTimeout(() => setSecret(false), 1500);
        }
        if(props.api!=="" && props.secret!=="" ){
          props.setLoading(true)
            props.Send()
           

        }


        
    }
    return (
        <div className="loginContainer">

            <div className="login">
                <div className="login-form">
                    <h1 className="login-heading">Connect your
                        Binance acount</h1>
                    <p className="login-text">The softest integration to our
                        partner Binance Global or Binance
                        US. Just follow these steps</p>

                    <div className="stepsList">
                        <ol>
                            <li>
                                Go to Binance website
                            </li>
                            <li>
                                Create API Key. See how.
                            </li>
                            <li>
                                Copy your API Key & Secret Key and paste it into the field below.
                            </li>
                        </ol>
                    </div>
                    <label className="formLabel">API Key</label>
                    <div className="field-container -password">
                    <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipMissing}
                            show={api}
                            placement="top"
                        >
                        <input type="password" placeholder="Your code"  onChange={(e)=>props.setApi(e.target.value)}/>
                        </OverlayTrigger>
                    </div>
                    <label className="formLabel">Secret Key</label>
                    
                    <div className="field-container -password">
                    <OverlayTrigger
                            delay={{ show: 250, hide: 400 }}
                            overlay={renderTooltipMissing}
                            show={secret}
                            placement="top"
                        >
                        <input type="password" placeholder="Your code" onChange={(e)=>props.setSecret(e.target.value)} />
                   
                        </OverlayTrigger>
                    </div>
                    <button className='btn btn-custom btn-lg page-scroll loginBtn' onClick={Next}>{props.loading ? (<ReactLoading
                            height={"20px"}
                            width={"24px"}
                            color="#0283b0" 
                        
                            type="spin"
                        />
                    ) : (
                        "Get Started"
                    )}</button>
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
import React, { useState } from "react"
import { Link, useHistory } from "react-router-dom"
// import logo from "../assets/images/logobleu.png"
import '../assets/css/SignIn.css'
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Step1 from "./Step1"
import Step2 from "./Step2"
import Step3 from "./Step3"
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    backButton: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['', '', ''];
}

export default function Registration() {

    const classes = useStyles();
    const [loading,setLoading]=useState(false)
    const [activeStep, setActiveStep] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [api, setApi] = useState("");
    const [secret, setSecret] = useState("");
    const [portfolio_size, setPortfolio_size] = useState("");
    const [strategy_suggestion, setStrategy_suggestion] = useState("option1");

    const history = useHistory()
    const steps = getSteps();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
    console.log({
        email: email,
        password: password,
        portfolio_size: portfolio_size,
        strategy_suggestion: strategy_suggestion,
        api: api,
        secret_key: secret
    })
    function Send() {
        axios.post("http://localhost:3001/auth/client/signup", {
            email: email,
            password: password,
            portfolio_size: portfolio_size,
            strategy_suggestion: strategy_suggestion,
            api: api,
            secret_key: secret
        }).then(res => {
            history.push("/login")
         
        })

    }

    return (
        <div className="loginContainer">
            <div className="login-header">
                {/* <img src={logo} className="loginLogo" /> */}
                <div className={classes.root}>
                    <Stepper activeStep={activeStep} connector=" " alternativeLabel>
                        {steps.map((label, index) => (
                            <Step key={index}>
                                <StepLabel></StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </div>
                <p className="signUpLink">Already have an account? <Link to="/login" className="here">Sign In</Link> </p>
            </div>
            {activeStep === 0 && <Step1 email={email} setEmail={setEmail} password={password} setPassword={setPassword} next={handleNext} setPasswordConfirm={setPasswordConfirm} passwordConfirm={passwordConfirm} step={activeStep} length={steps.length} />}
            {activeStep === 1 && <Step2 next={handleNext} portfolio_size={portfolio_size} setPortfolio_size={setPortfolio_size} strategy_suggestion={strategy_suggestion} setStrategy_suggestion={setStrategy_suggestion} step={activeStep} length={steps.length} />}
            {activeStep === 2 && <Step3 loading={loading} setLoading={setLoading} Send={Send} api={api} secret={secret} next={handleNext} setApi={setApi} setSecret={setSecret} step={activeStep} length={steps.length} />}
        </div>
    )
}
import React from 'react';
import { useState } from 'react'
import {Link} from "react-router-dom";
import InfoToolTips from "./InfoTooltip";

function Login(props) {
    const [emailVal, setEmail] = useState("");
    const [validEmail, updateValidEmailState] = useState("true");
    
    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
        console.log(emailVal);
    }
    
    const errClass = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$";

    return (
        <section className="login">
            <form action="#" className="login__form">
                <h2 className="login__heading"> Log in</h2>

                <label>
                    <input  
                        type="email" 
                        onChange={handleEmailChange} 
                        { emailVal.match(errClass) ? className="login__input" : className="login__input login--error" }
                        placeholder={'Email'}
                    />
                </label>
                <label>
                    <input 
                    className="login__input" 
                    placeholder={"Password"} />
                </label>
                <button onClick={alert123} type="submit" className="login__save"> Login </button>
                <Link to="/signup" className="login__prompt">Not a member yet? Sign up here!</Link>
            </form>

        </section>


    )

}

export default Login;
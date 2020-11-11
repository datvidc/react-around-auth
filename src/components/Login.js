import React from 'react';
import { useState } from 'react'
import {Link} from "react-router-dom";
import InfoToolTips from "./InfoTooltip";

function Login(props) {
    const [emailVal, setEmail] = useState("");
    const [validEmail, updateValidEmailState] = useState("false");
    
    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
        errorActive(e);
    }
    const errorActive = (email) => {
         if ( errorClass(email)) {
            updateValidEmailState("true");
            console.log("true");
        } else {
            updateValidEmailState("false");
            console.log("false");
        }
    }

    const alert123 = (e) => {
        e.preventDefault();
        console.log(validEmail);
        console.log(emailVal);
    }
    const errorClass = (value) => {
        const errClass = "^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$";
        return value.toString().match(errClass);
    }

    

    return (
        <section className="login">
            <form action="#" className="login__form">
                <h2 className="login__heading"> Log in</h2>

                <label>
                    <input  
                        type="email" 
                        onChange={handleEmailChange} 
                        className="login__input login--error"
                        placeholder={'Email'}
                        pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
                    />
                </label>
                <label>
                    <input 
                    className="login__input" 
                    placeholder={"Password"}
                    type="password" />
                </label>
                <button onClick={alert123} type="submit" className="login__save"> Login </button>
                <Link to="/signup" className="login__prompt">Not a member yet? Sign up here!</Link>
            </form>

        </section>


    )

}

export default Login;
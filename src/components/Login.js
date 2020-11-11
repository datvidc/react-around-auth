import React from 'react';
import { useState } from 'react'
import {Link} from "react-router-dom";
import InfoToolTips from "./InfoTooltip";

function Login(props) {
    const [emailVal, setEmail] = useState("");
    
    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
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
                <button type="submit" className="login__save"> Login </button>
                <Link to="/signup" className="login__prompt">Not a member yet? Sign up here!</Link>
            </form>

        </section>


    )

}

export default Login;
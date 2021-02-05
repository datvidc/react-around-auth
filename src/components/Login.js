import React from 'react';
import { useState } from 'react'
import { Link } from "react-router-dom";


function Login(props) {
    /*     const [validForm, setValidForm] = useState(false);
        const [emailerror, setEmailError] = useState(false); */
    const [emailVal, setEmail] = useState("");
    const [passwordVal, setPassword] = useState("");


    const handleEmailChange = (e) => {
        setEmail(e.currentTarget.value);
        /*  const emailValidationRegEx = /(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}/;
        if (emailValidationRegEx.test(emailVal)) {
            setValidForm(true);
            setEmailError(false);
        } else {
            console.log('error');
        } */

    }

    const handlePasswordChange = (e) => {
        setPassword(e.currentTarget.value);
    }

    const handleLoginBtnClick = (e) => {
        e.preventDefault();
        console.log("buttonClicked");

        props.onSignIn(emailVal, passwordVal);

    }




    return (
        <section className="login">
            <form action="#" className="login__form">
                <h2 className="login__heading"> Log in</h2>

                <label>
                    <input
                        type="email"
                        onChange={handleEmailChange}
                        className={'login__input'}
                        placeholder={'Email'}
                        pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
                    />
                </label>
                <label>
                    <input
                        onChange={handlePasswordChange}
                        className="login__input"
                        placeholder={"Password"}

                        type="password" />
                </label>
                <button onClick={handleLoginBtnClick} type="submit" className="login__save"> Login </button>

                <Link to="/signup" className="login__prompt">Not a member yet? Sign up here!</Link>
            </form>

        </section>


    )

}

export default Login;
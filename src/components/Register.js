import React, {useState} from 'react';
import { Link } from "react-router-dom";

import auth from "../utils/auth";


function Register(props) {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleEmailChange = event => setEmail(event.target.value);
    const handlePassChange = event => setPass(event.target.value);


    function handleSignin(e) {
        e.preventDefault();
        props.onRegister(email, pass);
    }

    return (
        <section className="login">
            <form action="#" className="login__form">
                <h2 className="login__heading"> Sign up </h2>

                <label>
                    <input
                        onChange={handleEmailChange}
                        type="email"
                        className="login__input"
                        placeholder={'Email'}
                        pattern="(?!(^[.-].*|[^@]*[.-]@|.*\.{2,}.*)|^.{254}.)([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~.-]+@)(?!-.*|.*-\.)([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,15}"
                    />
                </label>
                <label>
                    <input type="password" onChange={handlePassChange} className="login__input" placeholder={"Password"} />
                </label>
                <button type="submit" onClick={handleSignin} className="login__save"> Sign up </button>
                <Link to="/signin" className="login__prompt">Already a member? Log in here!</Link>
            </form>
        </section>


    )

}

export default Register;
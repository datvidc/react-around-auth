import React from 'react';
import {Link} from "react-router-dom";


function Register(props) {
    return (
        <section className="login">
            <form action="#" className="login__form">
                <h2 className="login__heading"> Sign up </h2>

                <label>
                    <input className="login__input" defaultValue={'Email'} />
                </label>
                <label>
                    <input className="login__input" defaultValue={"Password"} />
                </label>
                <button type="submit" className="login__save"> Sign up </button>
                <Link to="/signin" className="login__prompt">Already a member? Log in here!</Link>
            </form>
        </section>


    )

}

export default Register;
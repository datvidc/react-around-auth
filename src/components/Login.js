import React from 'react';
import {Link} from "react-router-dom";


function Login(props) {
    return (
        <section className="login">
            <form action="#" className="login__form">
                <h2> Log in</h2>

                <label>
                    <input value={'Email || "" '} />
                </label>
                <label>
                    <input value={"Password"} />
                </label>
                <button type="submit" className="login__save"> Login </button>
                <Link to="/signup" className="login__prompt">Not a member yet? Sign up here!</Link>
            </form>
        </section>


    )

}

export default Login;
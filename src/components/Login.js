import React from 'react';
import {Link} from "react-router-dom";


function Login(props) {
    


    return (
        <section className="login">
            <form action="#" className="login__form">
                <h2 className="login__heading"> Log in</h2>

                <label>
                    <input className="login__input" defaultValue={'Email'} />
                </label>
                <label>
                    <input className="login__input" defaultValue={"Password"} />
                </label>
                <button type="submit" className="login__save"> Login </button>
                <Link to="/signup" className="login__prompt">Not a member yet? Sign up here!</Link>
            </form>
        </section>


    )

}

export default Login;
import React, { useState } from "react";
import {  useHistory } from "react-router-dom"
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import logo from "../../assets/logo.png"
import "./index.css"

const SignUpPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [confirmError, setConfirmError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.preventDefault();
        if (password === confirmPassword) {
            setConfirmError("")
            const data = await dispatch(signUp(username, email, password));
            if (data) {
                setErrors(data)
            }
            else
                history.push("/projects")

        } else {
            setConfirmError("Passwords don't match");
        }
    };


    return (
        <div className="signUpContainer">
            <div className="signupHeader">
                <img className="singuplogo" src={logo} alt="logo" />
            </div>
            <div className="started">
                Get started - it's free!
            </div>
            <div className="formContainer">
                <form className="signupForm" onSubmit={handleSubmit}>
                    <div className="emailSignup">
                        <label>
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errors.username && (
                            <div className="emailError">{errors.username}</div>
                        )}

                    </div>
                    <div className="emailSignup">
                        <label>
                            Email
                        </label>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && (
                            <div className="emailError">{errors.email}</div>
                        )}

                    </div>
                    <div className="passwordSignup">
                        <label>
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        {errors.password && (
                            <div className="emailError">{errors.password}</div>
                        )}

                    </div>
                    <div className="passwordConfirmSignup">
                        <label>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        {confirmError && (
                            <div className="emailError">{confirmError}</div>
                        )}

                    </div>
                    <button type="submit">Submit</button>

                </form>
            </div>
        </div>
    )
}

export default SignUpPage;

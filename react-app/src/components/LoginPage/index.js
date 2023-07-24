import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

import logo from "../../assets/logo.png"
// import background from "../..assets/background.png"
import "./index.css"
import Footer from "../Footer";

const LoginPage = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(login(email, password));
        console.log(data)
        if (data)
        {
            setErrors(data);

        }
        else {
            history.push("/projects")
        }


    }

    const handleDemo = async (e) => {
        e.preventDefault()
        let d = "demo@aa.io"
        let p = "password"
        await dispatch(login(d,p))
        history.push("/projects")
    }

    return (
        <div className="loginContainer">
            <div className="header">
                <img className="logo" src={logo} alt="logo"/>
                <div className="text">DONT HAVE AN ACCOUNT? <Link to="/signup">SIGN UP</Link></div>
            </div>
            <div className="main">

                <div className="formAndText">
                    <div className="formText">
                        <h1>Pivotal Tracker is changing how teams build software—
                            one story at a time</h1>
                    </div>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="sign">Sign In</div>
                        <div className="continue">Sign in to continue to Trivial Tracker</div>
                        <div className="email">
                            <label>
                                Username or Email
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
                        <div className="password">
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

                        <button className="subbut" type="submit">Login</button>
                        <button onClick={handleDemo} className="demo">DEMO USER</button>

                    </form>

                </div>
                <div className="formText text2">
                    <h2>Proven project management for successful teams</h2>
                    <p>
                        With a shared view of team priorities, a process that fosters collaboration, and dynamic tools to analyze progress, your team will deliver more frequently and consistently.
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default LoginPage

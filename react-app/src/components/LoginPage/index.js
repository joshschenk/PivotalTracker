import { Link, useHistory } from "react-router-dom"
import { useState } from "react"
import { useDispatch } from "react-redux";
import { login } from "../../store/session";

import logo from "../../assets/logo.png"
// import background from "../..assets/background.png"
import "./index.css"
import Footer from "../Footer";
import { ReactComponent as Lione } from "../../assets/loginimage1.svg"
import { ReactComponent as Litwo } from "../../assets/loginimage2.svg"
import { ReactComponent as Lithree } from "../../assets/loginimage3.svg"


const LoginPage = () => {

    const history = useHistory()
    const dispatch = useDispatch()

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = await dispatch(login(email, password));
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
                <div className="lione">
                    <div className="formText text3">
                        <h2>Better organization to get focused</h2>
                        <p>
                            Keep your team on the rails. Tracker's shared backlog makes priorities clear so the team can stay organized. Easily visualize scope, focus your teamwork, and stay nimble when circumstances change.
                        </p>
                    </div>
                    <Lione/>
                </div>
                <div className="lione">
                    <Litwo />
                    <div className="formText text4">
                        <h2>Better organization to get focused</h2>
                        <p>
                            Keep your team on the rails. Tracker's shared backlog makes priorities clear so the team can stay organized. Easily visualize scope, focus your teamwork, and stay nimble when circumstances change.
                        </p>
                    </div>

                </div>
                <div className="lione">
                    <div className="formText text5">
                        <h2>Better organization to get focused</h2>
                        <p>
                            Keep your team on the rails. Tracker's shared backlog makes priorities clear so the team can stay organized. Easily visualize scope, focus your teamwork, and stay nimble when circumstances change.
                        </p>
                    </div>
                    <Lithree />
                </div>
                <div className="formText text2">
                    <h2>A better way to develop</h2>
                    <p>
                        Succeeding in an evolving tech landscape requires a time-tested process and a tool your team can rely on. Tracker's modern workflow helps your team keep the pace and adapt when needs change.
                    </p>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default LoginPage

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import Stories from "./components/Stories";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import StoriesDnD from "./components/StoriesDnD";
import StoriesTest from "./components/StoriesTest"

function App() {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, []);

  return (
    <>
      <Route exact path="/">
        <LoginPage />
      </Route>

      {isLoaded && (
        <Switch>
          {/* <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          // <Route exact path="/signup" >
          //   <SignUpPage />
          // </Route> */}
          {/* <Route exact path="/signup">
            <SignupFormPage />
          </Route> */}
          {/* <Route exact path="/stories">
            <Navigation isLoaded={isLoaded} />
            <Stories/>
          </Route> */}
          <Route exact path="/signup" >
             <SignUpPage />
          </Route>
          {sessionUser && <Route exact path="/projects">
            <Navigation isLoaded={isLoaded} />
            <StoriesDnD />
          </Route>}
          {/* <Route exact path="/StoriesTest">
            <StoriesTest />
          </Route> */}
        </Switch>
      )}
    </>
  );
}

export default App;

import React, { useState, useEffect } from "react";
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

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Route exact path="/">
        <LoginPage />
      </Route>

      {isLoaded && (
        <Switch>
          <Route exact path="/login" >
            <LoginFormPage />
          </Route>
          <Route exact path="/signup" >
            <SignUpPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/projects">
            <Navigation isLoaded={isLoaded} />
            <Stories/>
          </Route>
          <Route exact path="/stories">
            <StoriesDnD/>
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import HomePage from "./Components/HomePage";
import NavBar from "./Components/NavBar";
import UserSettings from "./Components/UserSettings";
import AuthProvider, { useAuth } from "./context/auth";
import AddPet from "./Components/AddPet";
import CreatedPet from "./Components/CreatedPet";
import PetPage from "./Components/PetPage";

// import Search from "./Components/Search";
// const AppRouter = () => {
//   let auth = useAuth();
// }
function PrivateRoute({ children, ...rest }) {
  let auth = useAuth();
  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth.token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const AppRouter = () => {
  let auth = useAuth();
  console.log(auth);
  console.log("app.js:", auth.token);
  if (!auth.isInitiallyLoaded) {
    return <div></div>;
  }
  return (
    <div>
      <AuthProvider>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <PrivateRoute path="/AddPet">
              <AddPet />
            </PrivateRoute>
            <PrivateRoute path="/pet/:id">
              <CreatedPet />
            </PrivateRoute>
            <Route path="/PetPage">
              <PetPage />
            </Route>
            <PrivateRoute path="/UserSettings">
              <UserSettings />
            </PrivateRoute>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
};
function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
export default App;

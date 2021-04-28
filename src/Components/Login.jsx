import React, { useState } from "react";
import { logUser } from "../Lib/api";
import { useAuth } from "../context/auth";

const Login = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const formSubmit = (event) => {
    event.preventDefault();
  };

  const loginUser = async (token) => {
    if (email && password) {
      try {
        const token = await logUser(email, password);
        console.log("login token(save token):", token.data.token);
        auth.saveToken(token);
      } catch (err) {
        alert("incorrect");
      }
    }
  };

  return (
    <div>
      <form onSubmit={formSubmit} className="loginContainer">
        <h3>LOG IN!</h3>
        <input
          className="inputField"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
        />
        <input
          className="inputField"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
        />
        <button type="submit" className="submitBtn" onClick={loginUser}>
          LOG IN
        </button>
      </form>
    </div>
  );
};

export default Login;

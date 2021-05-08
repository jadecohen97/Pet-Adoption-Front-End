import React, { useState } from "react";
import { logUser } from "../Lib/api";
import { useAuth } from "../context/auth";
import localforage from "localforage";
import Modal from "react-modal";

const Login = ({ isOpen, setModalIsOpen, setName }) => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const loginUser = async (event) => {
    event.preventDefault();

    if (email && password) {
      try {
        const userData = await logUser(email, password);
        localforage.setItem("userId", userData.data.user.id);
        auth.saveToken(userData);
        setName({
          firstName: userData.data.user.first_name,
          lastName: userData.data.user.last_name,
        });
        setModalIsOpen(false);
      } catch (err) {
        setLoginStatus("failed");
        throw "incorrect";
      }
    }
  };

  return (
    <Modal className="modal" isOpen={isOpen}>
      <button className="closeModal" onClick={() => setModalIsOpen(false)}>
        x
      </button>
      <form onSubmit={loginUser} className="loginContainer">
        <h3>LOG IN!</h3>
        {loginStatus == "failed" && <div>Login failed!</div>}
        <input
          className="inputField"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="email"
          onFocus={() => setLoginStatus("")}
        />
        <input
          className="inputField"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="password"
          onFocus={() => setLoginStatus("")}
        />
        <button className="submitBtn">LOG IN</button>
      </form>
    </Modal>
  );
};

export default Login;

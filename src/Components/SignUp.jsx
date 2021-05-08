import React, { useState } from "react";
import { signUpUser } from "../Lib/api";
import Modal from "react-modal";

const SignUp = ({ isOpen, setIsOpenSign }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });
  const [failedMessage, setFailedMessage] = useState("");

  function resetFailedMsg() {
    setFailedMessage("");
  }
  function handleChange(event) {
    const value = event.target.value;
    setUserInfo({
      ...userInfo,
      [event.target.name]: value,
    });
  }

  const SignUpUser = async (event) => {
    event.preventDefault();
    if (userInfo.password !== userInfo.confirmPassword) {
      setIsOpenSign(true);
      setFailedMessage("Passwords don't match!");
    } else {
      try {
        await signUpUser(userInfo);
        setFailedMessage("");
      } catch (err) {
        setFailedMessage(
          "oops.. we had a problem signing you in. check your credentials"
        );
      }
    }
  };

  return (
    <Modal className="modal" isOpen={isOpen}>
      <button className="closeModal" onClick={() => setIsOpenSign(false)}>
        x
      </button>
      <form onSubmit={(event) => SignUpUser(event)} className="loginContainer">
        <div>{failedMessage}</div>
        <h3>SIGN UP!</h3>
        <input
          className="inputField"
          type="text"
          value={userInfo.firstName}
          name="firstName"
          onChange={handleChange}
          placeholder="first name"
          onFocus={resetFailedMsg}
        />
        <input
          className="inputField"
          type="text"
          value={userInfo.lastName}
          name="lastName"
          onChange={handleChange}
          placeholder="last name"
          onFocus={resetFailedMsg}
        />
        <input
          onFocus={resetFailedMsg}
          className="inputField"
          type="email"
          value={userInfo.email}
          name="email"
          onChange={handleChange}
          placeholder="email"
        />
        <input
          onFocus={resetFailedMsg}
          className="inputField"
          type="tel"
          value={userInfo.phoneNo}
          name="phoneNo"
          onChange={handleChange}
          placeholder="phone number"
        />
        <input
          onFocus={resetFailedMsg}
          className="inputField"
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <input
          onFocus={resetFailedMsg}
          className="inputField"
          type="password"
          value={userInfo.confirmPassword}
          name="confirmPassword"
          placeholder="confirm password"
          onChange={handleChange}
        />
        <button className="submitBtn">SIGN UP</button>
      </form>
    </Modal>
  );
};

export default SignUp;

import React, { useState } from "react";
import { signUpUser } from "../Lib/api";
// import { useHistory } from "react-router-dom";

function SignUp() {
  // const history = useHistory();
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNo: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(event) {
    const value = event.target.value;
    setUserInfo({
      ...userInfo,
      [event.target.name]: value,
    });
  }

  const register = () => {
    if (userInfo.password !== userInfo.confirmPassword) {
      alert("Passwords don't match");
    } else {
      signUpUser(userInfo);
      alert(`Welcome ${userInfo.firstName}`);
      // alert("Welcome! Please login?");
      // history.push(`/signup/login`);
    }
  };

  function SignUpUser(event) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={(event) => SignUpUser(event)} className="loginContainer">
        <h3>SIGN UP!</h3>
        <input
          className="inputField"
          type="text"
          value={userInfo.firstName}
          name="firstName"
          onChange={handleChange}
          placeholder="first name"
        />
        <input
          className="inputField"
          type="text"
          value={userInfo.lastName}
          name="lastName"
          onChange={handleChange}
          placeholder="last name"
        />
        <input
          className="inputField"
          type="email"
          value={userInfo.email}
          name="email"
          onChange={handleChange}
          placeholder="email"
        />
        <input
          className="inputField"
          type="tel"
          value={userInfo.phoneNo}
          name="phoneNo"
          onChange={handleChange}
          placeholder="phone number"
        />
        <input
          className="inputField"
          type="password"
          value={userInfo.password}
          name="password"
          onChange={handleChange}
          placeholder="password"
        />
        <input
          className="inputField"
          type="password"
          value={userInfo.confirmPassword}
          name="confirmPassword"
          placeholder="confirm password"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="submitBtn"
          onClick={register}
          // disabled=
        >
          SIGN UP
        </button>
      </form>
    </div>
  );
}

export default SignUp;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Modal from "react-modal";
import Search from "./Search";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/auth";
import localforage from "localforage";

Modal.setAppElement("body");

const NavBar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenSign, setIsOpenSign] = useState(false);
  const [name, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const onOpenModal = () => {
    setModalIsOpen(!modalIsOpen);
  };
  const onCloseModal = () => setModalIsOpen(false);
  const onOpenModalSign = () => setIsOpenSign(true);
  const onCloseModalSign = () => setIsOpenSign(false);

  useEffect(() => {
    const first = localforage.getItem("Name").then((name) => {
      setFirstName(name);
      console.log("first", name);
    });
    const last = localforage
      .getItem("LastName")
      .then((name) => setLastName(name));
    console.log(first, last);
  }, []);

  const setName = (userNames) => {
    localforage.setItem("Name", userNames.firstName);
    localforage.setItem("LastName", userNames.lastName);
    setFirstName(userNames.firstName);
    setLastName(userNames.lastName);
  };
  const auth = useAuth();

  const logoutUser = (token) => {
    // setIsLoggedIn(false);
    auth.removeToken(token);
    console.log(isLoggedIn, "isLoggedIn");
    // const getName = localforage.removeItem("Name").then((data) => {
    //   setName(data);
    // });
    // const getLastname = localforage.removeItem("LastName").then((data) => {
    //   setLastName(data);
    // });
  };

  return (
    <div>
      <div className="NavBar">
        <strong>
          <Link to="/">
            Welcome To Pet Adoption {name} {lastName}
          </Link>
        </strong>
        <Link to="/AddPet">add pet</Link>
        <Link to="/PetPage">Pet Page</Link>
        <Link to="/MyPets">My Pets</Link>
        <div>
          <div>
            <Link to="/Search">SEARCH</Link>
          </div>
        </div>
        <div className="rightNav">
          {/* <div> */}

          {auth.token ? (
            <span>
              <Link to="/UserSettings">
                {" "}
                {name} {lastName}
              </Link>
              <button className="navBtns" onClick={logoutUser}>
                LOGOUT
              </button>
            </span>
          ) : (
            <span>
              <button className="navBtns" onClick={onOpenModal}>
                LOGIN
              </button>

              <button className="navBtns" onClick={onOpenModalSign}>
                SIGNUP
              </button>
            </span>
          )}
          {/* {!isLoggedIn && ( */}
          {/* <button className="navBtns" onClick={onOpenModalSign}>
            SIGNUP
          </button> */}
          {/* )} */}
          {/* {isLoggedIn && (
          <button className="navBtns" onClick={logoutUser}>
            LOGOUT
          </button>
          )} */}
        </div>
      </div>

      <Login
        isOpen={modalIsOpen}
        setModalIsOpen={setModalIsOpen}
        setName={setName}
      />
      <SignUp isOpen={modalIsOpenSign} setIsOpenSign={setIsOpenSign} />
    </div>
  );
};
export default NavBar;

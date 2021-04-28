import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";
import Modal from "react-modal";

Modal.setAppElement("body");

function NavBar() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpenSign, setIsOpenSign] = useState(false);
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);
  const onOpenModalSign = () => setIsOpenSign(true);
  const onCloseModalSign = () => setIsOpenSign(false);

  return (
    <div>
      <div className="NavBar">
        <Link to="/">Welcome To Pet Adoption, User</Link>
        <Link to="/AddPet">add pet</Link>
        <Link to = "/PetPage">Pet Page</Link>
        <div className="rightNav">
          <Link to="/UserSettings"> user</Link>
          <button className="navBtns" onClick={onOpenModal}>
            LOGIN
          </button>
          |
          <button className="navBtns" onClick={onOpenModalSign}>
            SIGNUP
          </button>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} className="modal">
        <button className="closeModal" onClick={onCloseModal}>
          x
        </button>
        <Login />
      </Modal>
      <Modal isOpen={modalIsOpenSign} className="modal">
        <button className="closeModal" onClick={onCloseModalSign}>
          x
        </button>
        <SignUp />
      </Modal>
    </div>
  );
}
export default NavBar;

import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import Modal from "react-modal";
import { getUserPets, getUsersSavedPets, getPetData } from "../Lib/api";
import { useParams } from "react-router-dom";
import CreatedPet from "./CreatedPet";
import localforage from "localforage";

Modal.setAppElement("body");

const MyPets = () => {
  const auth = useAuth();
  const onOpenModal = () => setIsOpen(true);
  const onCloseModal = () => setIsOpen(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [myPets, setMyPets] = useState([]);
  const [showThisPet, setShowThisPet] = useState("");
  const [mySavedPets, setMySavedPets] = useState([]);
  const [petData, setPetData] = useState([]);
  const petId = useParams();

  useEffect(() => {
    const authToken = auth.token.data ? auth.token.data.token : auth.token;
    getUserPets(petId, authToken).then((data) => {
      setMyPets(data);
    });
    getUsersSavedPets(petId, authToken).then((data) => {
      getPetDataPerSavedPetId(data);
      setMySavedPets(data);
    });
    const getPetDataPerSavedPetId = async (data) => {
      const savedPetsInfo = data.map(async (data) => {
        const petdata = await getPetData(data.petId, authToken);
        Promise.all(savedPetsInfo).then((savedPetsInfo) =>
          setPetData(savedPetsInfo)
        );
        return petdata;
      });
    };
  }, []);

  const viewPet = (event) => {
    const targetPetId = event.target.value;
    setShowThisPet({ value: targetPetId });
    onOpenModal();
  };

  if (myPets.length === 0 && petData.length === 0) {
    return <p className="noPetsText"> You Do not own / foster any pets </p>;
  }
  return (
    <div>
      <div className="petPage">
        <ul className="petList">
          <h3 className="PetsText">VIEW YOUR PETS</h3>
          {myPets.map((myPets) => (
            <li key={myPets.id}>
              <div className="card">
                <div>{myPets.name}</div>
                <div>{myPets.adoption_Status}</div>
                <div>
                  <img className="petImgs" src={myPets.picture_url}></img>
                </div>
                <button
                  className="submitBtn"
                  value={myPets.id}
                  onClick={viewPet}
                >
                  see more info
                </button>
                <Modal isOpen={modalIsOpen} className="modal">
                  <button className="closeModal" onClick={onCloseModal}>
                    x
                  </button>
                  <CreatedPet targetPetId={showThisPet.value} />
                </Modal>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <ul className="petList">
          <h3 className="PetsText">YOUR SAVED PETS</h3>
          {petData.map((petData) => (
            <li className="list" key={petData[0].id}>
              <div className="card">
                <div>{petData[0].adoption_Status}</div>
                <div>
                  <img className="petImgs" src={petData[0].picture_url}></img>
                </div>
                <button
                  className="submitBtn"
                  value={petData[0].id}
                  onClick={viewPet}
                >
                  see more info
                </button>
                <Modal isOpen={modalIsOpen} className="modal">
                  <button className="closeModal" onClick={onCloseModal}>
                    x
                  </button>
                  <CreatedPet targetPetId={showThisPet.value} />
                </Modal>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPets;

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
      console.log("data", data);
      setMyPets(data);
    });

    getUsersSavedPets(petId, authToken).then((data) => {
      getPetDataPerSavedPetId(data);
      setMySavedPets(data);
    });

    const getPetDataPerSavedPetId = async (data) => {
      const savedPetsInfo = data.map(async (data) => {
        const petdata = await getPetData(data.petId, auth.token);
        Promise.all(savedPetsInfo).then((savedPetsInfo) =>
          setPetData(savedPetsInfo)
        );
        return petdata;
      });
    };
  }, [petId, auth.token]);

  const viewPet = (event) => {
    const targetPetId = event.target.value;
    setShowThisPet({ value: targetPetId });
    onOpenModal();
  };

  if (myPets.length === 0 || petData.length === 0) {
    return <p className="noPetsText"> You Do not own / foster any pets </p>;
  }
  return (
    <div className="petPage">
      <ul className="petList">
        <h4>pets:</h4>
        {myPets.map((myPets) => (
          <li key={myPets.id}>
            <div className="card">
              <div>{myPets.name}</div>
              <div>{myPets.adoption_Status}</div>
              <div>
                <img src={myPets.picture_url} width="100" height="50"></img>
              </div>
              <button value={myPets.id} onClick={viewPet}>
                SEE MORE INFO
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
      <ul className="petList" id="savedPets">
        <h3>saved:</h3>
        {/* {petData.length > 1 &&( */}
        {petData.map((petData) => (
          <li key={petData[0].id}>
            <div className="card">
              <div>{petData[0].adoption_Status}</div>

              <div>
                <img src={petData[0].picture_url} width="100" height="50"></img>
              </div>
              <button value={petData[0].id} onClick={viewPet}>
                SEE MORE INFO
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
  );
};

export default MyPets;

import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import Modal from "react-modal";
import { getUserPets, getUsersSavedPets, getPetData } from "../Lib/api";
import { useParams } from "react-router-dom";
import CreatedPet from "./CreatedPet";
import localforage from "localforage";

// Modal.setAppElement("body");

const MyPets = () => {
  const auth = useAuth();
  // const onOpenModalPet = () => setIsOpenPet(true);
  const onCloseModalPet = () => setIsOpenPet(false);
  const [modalIsOpenPet, setIsOpenPet] = useState(false);
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
    setIsOpenPet(true);
  };

  if (myPets.length === 0 && petData.length === 0) {
    return <p className="noPetsText"> You Do not own / foster any pets </p>;
  }
  return (
    <div className="myPetsWrapper">
      <div className="PetsText">VIEW YOUR PETS</div>
      <ul className="myPetsPage">
        {myPets.map((myPets) => (
          <li key={myPets.id}>
            <div className="mypets">
              <div className="petName">{myPets.name}</div>
              <div className="adoptionText">{myPets.adoption_Status}</div>
              <div>
                <img className="petImages" src={myPets.picture_url}></img>
              </div>
              <button className="submitBtn" value={myPets.id} onClick={viewPet}>
                see more info
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Modal isOpen={modalIsOpenPet} className="modal">
        <button className="closeModal" onClick={onCloseModalPet}>
          x
        </button>
        <CreatedPet targetPetId={showThisPet.value} />
      </Modal>
      <div className="PetsText">YOUR SAVED PETS</div>
      <div>
        <ul className="myPetsPage">
          {petData.map((petData) => (
            <li className="petList" key={petData[0].id}>
              <div className="mypets">
                <div className="petName">{petData[0].name}</div>
                <div className="adoptionText">{petData[0].adoption_Status}</div>
                <div>
                  <img className="petImages" src={petData[0].picture_url}></img>
                </div>
                <button
                  className="submitBtn"
                  value={petData[0].id}
                  onClick={viewPet}
                >
                  see more info
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MyPets;

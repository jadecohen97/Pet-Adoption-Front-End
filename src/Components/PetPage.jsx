import { useEffect, useState } from "react";
import {
  getAllPets,
  updateAdoptedPet,
  updateFosteredPet,
  returnPet,
  savePets,
  deleteSavedPet,
  getUsersSavedPets,
} from "../Lib/api";
import { useAuth } from "../context/auth";
import localforage from "localforage";
import { useParams } from "react-router-dom";

const PetPage = () => {
  const auth = useAuth();
  const [isFostered, setIsFostered] = useState("");
  const [isAdopted, setIsAdopted] = useState("");
  const [isReturned, setIsReturned] = useState("");
  const [isSaved, setIsSaved] = useState("");
  const [isUnsaved, setIsUnsaved] = useState("");
  const [pets, setPets] = useState([]);
  const [userId, setUserId] = useState("");

  const [user, setUser] = useState("");
  const [petsSaved, setPetsSaved] = useState([]);
  const authToken = auth.token.data ? auth.token.data.token : auth.token;
  const petId = useParams();

  useEffect(() => {
    getAllPets().then((data) => {
      setPets(data.pets);
    });
    localforage.getItem("userId").then((user) => {
      setUser(user);
    });

    getUsersSavedPets(petId, authToken).then((data) => {
      const newArrayForSavedPetsId = [];
      for (let i in data) {
        newArrayForSavedPetsId.push(data[i].petId);
        setPetsSaved(newArrayForSavedPetsId);
        document
          .getElementById(`${data[i].petId}-save`)
          .setAttribute("disabled", "true");
      }
    });
  }, []);

  const handleIsAdopted = async (event) => {
    const petId = event.target.value;
    setIsAdopted({ value: petId });
    await updateAdoptedPet(petId, isAdopted, authToken);
  };

  const handleIsFostered = async (event) => {
    const petId = event.target.value;
    setIsFostered({ value: petId });
    await updateFosteredPet(petId, isFostered, authToken);
  };

  const handleReturnPet = async (event) => {
    const petId = event.target.value;
    setIsReturned({ value: petId });
    await returnPet(petId, isReturned, authToken);
  };

  const handleSavePet = async (event) => {
    const petId = event.target.value;
    document.getElementById(`${petId}-save`).setAttribute("disabled", "true");
    document.getElementById(`${petId}-unsave`).remove("disabled");

    setIsSaved({ value: petId });
    await savePets(petId, isSaved, authToken).then((data) => {
      setUserId(data.userId);
    });
  };

  const handleUnsavePet = async (event) => {
    const petId = event.target.value;
    document.getElementById(`${petId}-unsave`).setAttribute("disabled", "true");
    document.getElementById(`${petId}-save`).removeAttribute("disabled");

    setIsUnsaved({ value: petId });
    await deleteSavedPet(petId, authToken);
  };

  const renderPetsUnsaveAndSave = (pet) => {
    const index = petsSaved.indexOf(pet.id);
    if (petsSaved.includes(pet.id) && petsSaved[index] === pet.id) {
      return (
        <button value={pets.id} onClick={handleUnsavePet}>
          Unsave
        </button>
      );
    } else {
      return (
        <button value={pets.id} onClick={handleSavePet}>
          save
        </button>
      );
    }
  };

  return (
    <div className="petPage">
      <ul className="petList">
        <h4>
          ADOPT <br /> <br /> <br /> FOSTER <br /> <br /> <br /> SAVE <br />{" "}
        </h4>
        {pets.map((pet) => (
          <li key={pet.id}>
            <div className="card">
              <div>{pet.name}</div>
              <div>{pet.type}</div>
              <div>{pet.breed}</div>
              <div>{pet.adoption_Status}</div>
                <img className="petImgs" src={pet.picture_url}></img>
              <div>Height: {pet.height}</div>
              <div>Weight: {pet.weight}</div>
              <div>{pet.color}</div>
              <div>{pet.bio}</div>
              <div>
                hypoallergenic? {pet.hypoallergenic === 0 ? "yes" : "no"}
              </div>
              <div>Dietary Restrictions? {pet.dietary_restrictions}</div>
              {auth.token && (
                <div>
                  {(pet.adoption_Status === "Available" ||
                    pet.fosteredBy === user) && (
                    <button value={pet.id} onClick={handleIsAdopted}>
                      adopt
                    </button>
                  )}
                </div>
              )}
              {auth.token && (
                <div>
                  {pet.adoption_Status !== "Fostered" &&
                    pet.adoption_Status === "Available" && (
                      <button value={pet.id} onClick={handleIsFostered}>
                        foster
                      </button>
                    )}
                </div>
              )}
              {auth.token && (
                <div>
                  {(pet.adoptedBy === user || pet.fosteredBy === user) && (
                    <button value={pet.id} onClick={handleReturnPet}>
                      return
                    </button>
                  )}
                </div>
              )}
              {authToken && (
                <span>
                  <button
                    id={`${pet.id}-unsave`}
                    value={pet.id}
                    onClick={handleUnsavePet}
                  >
                    Unsave
                  </button>
                  <button
                    id={`${pet.id}-save`}
                    value={pet.id}
                    onClick={handleSavePet}
                  >
                    save
                  </button>
                </span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PetPage;

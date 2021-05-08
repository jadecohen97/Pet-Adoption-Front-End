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
  const [savedBy, setSavedBy] = useState([]);
  const [petsSaved, setPetsSaved] = useState([]);

  const petId = useParams();
  useEffect(() => {
    getAllPets().then((data) => {
      setPets(data.pets);
    });
    localforage.getItem("userId").then((user) => {
      setUser(user);
    });
    getUsersSavedPets(petId, auth.token).then((data) => {
      console.log(data);
      const arraytwo = [];
      for (let i in data) {
        arraytwo.push(data[i].petId);
        setPetsSaved(arraytwo);
        console.log(arraytwo);
      }
    });
    //

    // console.log("petssaved", arraytwo);
    // }

    // setSavedBy(data);
    // console.log(savedBy, "Savedby");
    // });
    // setSavedBy(data);
    // console.log(savedBy, "savedpetid");

    // return data;
    // let y = data.petId;
    // setSavedPetId(y);

    //     console.log(data.savedBy)
    // if (data.savedBy === user ){
    //   let x = user
    // }
    //   setSavedBy(data);
    //   console.log("savedby", data);
    // });
  }, []);

  const handleIsAdopted = async (event) => {
    const petId = event.target.value;
    setIsAdopted({ value: petId });
    await updateAdoptedPet(petId, isAdopted, auth.token);
  };

  const handleIsFostered = async (event) => {
    const petId = event.target.value;
    setIsFostered({ value: petId });
    await updateFosteredPet(petId, isFostered, auth.token);
    alert("thsnkshdkihd ");
  };

  const handleReturnPet = async (event) => {
    const petId = event.target.value;
    setIsReturned({ value: petId });
    await returnPet(petId, isReturned, auth.token);
  };

  const handleSavePet = async (event) => {
    const petId = event.target.value;
    setIsSaved({ value: petId });
    await savePets(petId, isSaved, auth.token).then((data) => {
      setUserId(data.userId);
    });
  };

  const handleUnsavePet = async (event) => {
    const petId = event.target.value;
    setIsUnsaved({ value: petId });
    await deleteSavedPet(petId, auth.token);
  };

  // get owner id !!!!!! then if owner id = adoptted by id = can return or if fostered by id = ologged in user
  return (
    <div className="petPage">
      <ul className="petList">
        <h4>pets:</h4>
        {pets.map((pets) => (
          <li key={pets.id}>
            <div className="card">
              <div>{pets.name}</div>
              <div>{pets.type}</div>
              <div>{pets.breed}</div>
              <div>{pets.adoption_Status}</div>
              <div className="petImgs">
                <img className="petImgs" src={pets.picture_url}></img>
              </div>
              <div>Height: {pets.height}</div>
              <div>Weight: {pets.weight}</div>
              <div>{pets.color}</div>
              <div>{pets.bio}</div>
              <div>
                hypoallergenic? {pets.hypoallergenic === 0 ? "yes" : "no"}
              </div>
              <div>Dietary Restrictions? {pets.dietary_restrictions}</div>
              {auth.token && (
                <div>
                  {(pets.adoption_Status === "Available" ||
                    pets.fosteredBy === user) && (
                    <button value={pets.id} onClick={handleIsAdopted}>
                      adopt
                    </button>
                  )}
                </div>
              )}
              {auth.token && (
                <div>
                  {pets.adoption_Status !== "Fostered" &&
                    pets.adoption_Status === "Available" && (
                      <button value={pets.id} onClick={handleIsFostered}>
                        foster
                      </button>
                    )}
                </div>
              )}
              {auth.token && (
                <div>
                  {(pets.adoptedBy === user || pets.fosteredBy === user) && (
                    <button value={pets.id} onClick={handleReturnPet}>
                      return
                    </button>
                  )}
                </div>
              )}
              {auth.token && (
                <div>
                  {petsSaved && (
                    <button value={pets.id} onClick={handleSavePet}>
                      {/* {savedBy ? "unsave" : "save"} */}save
                    </button>
                  )}
                </div>
              )}

              {auth.token && (
                <div>
                  {savedBy !== user && savedBy[0] !== pets.id && (
                    <button value={pets.id} onClick={handleUnsavePet}>
                      {/* { userId? "Saved" : "Save"} save */} Unsave
                    </button>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default PetPage;

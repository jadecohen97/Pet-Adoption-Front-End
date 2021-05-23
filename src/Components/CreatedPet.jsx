import { useEffect, useState } from "react";
import { getPetById } from "../Lib/api";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

const CreatedPet = ({ targetPetId }) => {
  const auth = useAuth();
  const petsId = targetPetId;
  const [petData, setPet] = useState("");
  useEffect(() => {
    getPetById(petsId).then((data) => {
      setPet(data);
    });
  }, [petsId, auth.token]);

  return (
    <div className="singlePetCard">
      <p className="petName">{petData.name}</p>
      <p className="petBreed">{petData.breed}</p>
      <img className="petImgs"src={petData.picture_url} alt=""></img>
      <p className="adoptionText">{petData.adoption_Status}</p>
      <p className="petBio">{petData.bio}</p>
      <div className="petInfoWrapper">
      <p>color: {petData.color}</p>
      <p>height: {petData.height}</p>
      <p>weight: {petData.weight}</p>
      <p>dietary restrictions?{petData.dietary_restrictions}</p>
      <p>hypoallergenic?{petData.hypoallergenic === 0 ? "yes" : "no"}</p>
      </div>
      <Link to={`/petPage`} className="submitBtn">
        go to pets page?
      </Link>
    </div>
  );
};
export default CreatedPet;

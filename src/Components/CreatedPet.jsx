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

  if (!petsId) {
    return <div>no pet</div>;
  }

  return (
    <div>
      <p>{petData.name}</p>
      <p>type: {petData.type}</p>
      <img src={petData.picture_url} width="100" height="100" alt=""></img>
      <p>adoption status: {petData.adoption_Status}</p>
      <p>{petData.bio}</p>
      <p>{petData.breed}</p>
      <p>{petData.color}</p>
      <p>dietary restrictions?{petData.dietary_restrictions}</p>
      <p>height: {petData.height}</p>
      <p>weight: {petData.weight}</p>
      <p>hypoallergenic?{petData.hypoallergenic === 0 ? "yes" : "no"}</p>
      <Link to={`/petPage`} className="submitBtn">
        go to pets page?
      </Link>
    </div>
  );
};
export default CreatedPet;

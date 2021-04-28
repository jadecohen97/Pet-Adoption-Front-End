import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById } from "../Lib/api";
import { useAuth } from "../context/auth";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

function CreatedPet() {
  const auth = useAuth();
  const petId = useParams();
  console.log(petId);
  const [pet, setPet] = useState(null);


  // navigate to petpage to see all the pets 
  // const goToPetPage = () => {
  //   history.push(`/pets`);
  // };


  useEffect(() => {
    getPetById(petId, auth.token).then((data) => {
      console.log(data.data);
      setPet(data.data);
    });
  }, [petId, auth.token]);
  if (!pet) {
    return <div>no pet</div>;
  }
  return (
    <div className="petDisplay">
      <p>name: {pet.name}</p>
      <p>{pet.picture_url}</p>
      <img src = {pet.picture_url}></img>
      <p>adoption status: {pet.adoption_Status}</p>
     <Link to={`/petPage`} className="petLink">Go to pets page?</Link>
    </div>
  );
}
export default CreatedPet;

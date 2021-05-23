import React, { useState } from "react";
import { addThePet } from "../Lib/api";
import { useAuth } from "../context/auth";
import { useHistory } from "react-router-dom";
import { putPetImage } from "../Lib/api";
import { v4 as uuidv4 } from "uuid";

function AddPet() {
  const auth = useAuth();
  const history = useHistory();
  const [picture_url, setPicture_url] = useState("");
  const [addPet, setAddPet] = useState({
    id: "",
    type: "",
    name: "",
    adoptionStatus: "",
    image: "",
    height: 0,
    weight: 0,
    color: "",
    bio: "",
    hypoallergenic: false,
    dietaryRestrictions: "",
    breed: "",
  });

  function handleChange(event) {
    const value = event.target.value;
    setAddPet({
      ...addPet,
      [event.target.name]: value,
    });
  }

  const addNewPet = async (event) => {
    const authToken = auth.token.data ? auth.token.data.token : auth.token;
    event.preventDefault();
    const formData = new FormData();
    formData.append("image", picture_url);
    const id = uuidv4();
    const picture = await putPetImage(id, formData, authToken);
    setAddPet({
      id: "",
      type: "",
      name: "",
      adoptionStatus: "",
      image: "",
      height: 0,
      weight: 0,
      color: "",
      bio: "",
      hypoallergenic: false,
      dietaryRestrictions: "",
      breed: "",
    });

    addPet.id = id;
    addPet.image = picture;
    const petAdded = await addThePet(addPet, authToken);
    alert("pet added successfully");
    history.push(`/`);
  };

  return (
    <div>
      <form onSubmit={addNewPet} className="AddPetPage">
      <h3 className="addPetText">ADD A <br/><br/> NEW PET!</h3>
        <input
          className="inputField"
          type="text"
          value={addPet.type}
          name="type"
          onChange={handleChange}
          placeholder="type"
        />
        <input
          className="inputField"
          type="text"
          value={addPet.name}
          name="name"
          onChange={handleChange}
          placeholder="name"
        />
        <select
          className="inputField"
          name="adoptionStatus"
          onChange={handleChange}
          value={addPet.adoptionStatus}
        >
          <option value>Select Adoption Status</option>
          <option value="Adopted">Adopted</option>
          <option value="Fostered">Fostered</option>
          <option value="Available">Available</option>
        </select>
        <input
          className="inputField"
          type="file"
          name="picture"
          onChange={(event) => setPicture_url(event.target.files[0])}
          placeholder="add pet image"
        />
        <input
          className="inputField"
          type="number"
          value={addPet.height}
          name="height"
          onChange={handleChange}
          placeholder="height"
        />
        <input
          className="inputField"
          type="number"
          value={addPet.weight}
          name="weight"
          placeholder="weight"
          onChange={handleChange}
        />
        <input
          className="inputField"
          type="text"
          value={addPet.color}
          name="color"
          placeholder="color"
          onChange={handleChange}
        />
        <input
          className="inputField"
          type="text"
          value={addPet.bio}
          name="bio"
          placeholder="bio"
          onChange={handleChange}
        />
        <select
          className="inputField"
          name="hypoallergenic"
          onChange={handleChange}
          value={addPet.hypoallergenic}
        >
          <option value>hypoallergenic?</option>
          <option value="0">yes</option>
          <option value="1">no</option>
        </select>
        <input
          className="inputField"
          type="text"
          value={addPet.dietaryRestrictions}
          name="dietaryRestrictions"
          placeholder="dietary restrictions"
          onChange={handleChange}
        />
        <input
          className="inputField"
          type="text"
          value={addPet.breed}
          name="breed"
          placeholder="breed"
          onChange={handleChange}
        />

        <button className="addPetBtn">ADD PET</button>
      </form>
    </div>
  );
}

export default AddPet;

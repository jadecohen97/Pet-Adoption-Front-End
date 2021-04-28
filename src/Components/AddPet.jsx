import React, { useState } from "react";
import { addThePet } from "../Lib/api";
import { useAuth } from "../context/auth";
import { useHistory } from "react-router-dom";

function AddPet() {
  const auth = useAuth();
  const history = useHistory();
  const [addPet, setAddPet] = useState({
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

  const createPet = async () => {
    const pet = await addThePet(addPet, auth.token);
    alert("pet added successfully");
    history.push(`/pet/${pet.pets.id}`);
  };

  function addNewPet(event) {
    event.preventDefault();
  }

  return (
    <div>
      <form onSubmit={(event) => addNewPet(event)} className="UserProfile">
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
          value={addPet.image}
          name="image"
          onChange={handleChange}
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

        <button type="submit" className="submitBtn" onClick={createPet}>
          Add Pet
        </button>
      </form>
    </div>
  );
}

export default AddPet;

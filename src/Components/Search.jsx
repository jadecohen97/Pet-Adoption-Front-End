import React, { useState } from "react";
import { getPetType} from "../Lib/api";
import { useAuth } from "../context/auth";
import CreatedPet from "./CreatedPet";
import PetPage from "./PetPage";

const Search = () => {
  const auth = useAuth();
  const [searchPet, setSearchPet] = useState([]);
  const [type, setType] = useState("");
  const handleChange = (event) => {
    setType(event.target.value);
  };
  const searchPetType = async () => {
    await getPetType(type).then((data) => {
      setSearchPet(data);
    });
  };
  if (!searchPet) {
    return (
      <div>
        <PetPage />{" "}
      </div>
    );
  }
  return (
    <div>
      <form className="searchPage" onSubmit={(e) => e.preventDefault()}>
        <input
          className="searchBar"
          type="search"
          placeholder="Search"
          onChange={handleChange}
        />
        <button className="searchBtn" onClick={searchPetType}>
          Search pet type
        </button>
      </form>
      <div className="petPage">
        {searchPet.map((pet) => {
          return <CreatedPet key={pet.id} targetPetId={pet.id} />;
        })}
      </div>
    </div>
  );
};
export default Search;

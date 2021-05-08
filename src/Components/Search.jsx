import React, { useState } from "react";
import { getPetType, getPetAdvancedSearch } from "../Lib/api";
import { useAuth } from "../context/auth";
import CreatedPet from "./CreatedPet";
import PetPage from "./PetPage";

const Search = () => {
  const auth = useAuth();
  const [searchPet, setSearchPet] = useState([]);
  const [type, setType] = useState("");
  // const [height, setHeight] = useState("");
  // const [weight, setWeight] = useState("");
  // const [name, setName] = useState("");
  // const [adoption_status, setAdoption_status] = useState("");
  // const [advancedSearch, setAdvancedSearch] = useState([]);
  // const [selected, setSelected] = useState([]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  // const handlethischange = (event) => {
  //   setAdoption_status(event.target.value);
  // };
  // const handleAdvanceSearch = () => {
  //   getPetAdvancedSearch(adoption_status, height, type, weight, name).then(
  //     (data) => {
  //       console.log(data);
  //     }
  //   );

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
        <input className="searchBar"
          type="search"
          placeholder="Search"
          onChange={handleChange}

          // aria-label="Search"
          // aria-describedby="search-addon"
        />
        <button className="searchBtn" onClick={searchPetType}>Search pet type</button>

        {/* <input
          style={{ marginTop: "20vh" }}
          type="search"
          placeholder="Search text"
          // value={searchPet}
          onChange={handlethischange}
          // aria-label="Search"
          // aria-describedby="search-addon"
        /> */}
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

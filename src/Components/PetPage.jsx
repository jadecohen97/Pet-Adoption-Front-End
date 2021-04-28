import { useEffect, useState } from "react";
import { getAllPets } from "../Lib/api";
import { Link } from "react-router-dom";

const PetPage = () => {
  const [pets, setPets] = useState([]);
  useEffect(() => {
    getAllPets().then((data) => {
      setPets(data.data.pets);
      console.log(data.data);
    });
  }, []);
  return (
    <div className="petPage">
      <ul className="petList">
        <h4>pets:</h4>
        {pets.map((pets) => (
          <li key={pets.id}> 
          <div className="card">
          <div>
          {pets.name}
          </div>
          <div>
          {pets.breed}
          </div>
          <div>
          {pets.adoption_Status}
          </div>
          <Link to = {`/pet/${pets.id}`} className="petLink">link to pet</Link>
          
          <div>
              <button>adopt</button>
              <button>foster</button>
              <button>return</button>
          </div>
          </div>
</li>


        ))}
      </ul>
    </div>
  );
};
export default PetPage;

import axios from "axios";

const BaseUrl = "http://localhost:8050";

function getAuthConfig(token) {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
}

export async function signUpUser(userInfo) {
  const response = await axios.post(`${BaseUrl}/signup`, {
    first_name: userInfo.firstName,
    last_name: userInfo.lastName,
    email: userInfo.email,
    phone_number: userInfo.phoneNo,
    password_hash: userInfo.password,
  });
  return response;
}

export async function logUser(email, password) {
  const response = await axios.post(`${BaseUrl}/signup/login`, {
    email: email,
    password: password,
  });
  return response;
}

export async function addThePet(addPet, token) {
  const response = await axios.post(
    `${BaseUrl}/pets`,
    {
      type: addPet.type,
      name: addPet.name,
      adoption_Status: addPet.adoptionStatus,
      picture_url: addPet.image,
      height: addPet.height,
      weight: addPet.weight,
      color: addPet.color,
      bio: addPet.bio,
      hypoallergenic: addPet.hypoallergenic,
      dietary_restrictions: addPet.dietaryRestrictions,
      breed: addPet.breed,
    },
    getAuthConfig(token)
  );

  return response.data;
  // console.log(token);
}

export async function getPetById(id, token) {
  const response = await axios.get(
    `${BaseUrl}/pets/` + id.id,
    getAuthConfig(token)
  );
  console.log("get petbyid:", response, id.id);
  return response;
}

export async function getAllPets() {
  const response = await axios.get(`${BaseUrl}/pets`);
  console.log(response);
  return response;
}

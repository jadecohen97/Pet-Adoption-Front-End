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
  const response = axios.post(`${BaseUrl}/signup`, {
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
}

export async function getPetById(id) {
  const response = await axios.get(
    `${BaseUrl}/pets/` + id
    // getAuthConfig(token)
  );
  return response.data;
}

export async function getAllPets() {
  const response = await axios.get(`${BaseUrl}/pets`);
  return response.data;
}

export async function putPetImage(pet, formData, token) {
  const response = await axios({
    method: "put",
    url: `${BaseUrl}/pets/picture/${pet}`,
    data: formData,
    headers: {
      Authorization: `Bearer ` + token,
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
}

export async function updateAdoptedPet(petId, petStatus, token) {
  const response = await axios.post(
    `${BaseUrl}/pets/adopt/${petId}`,
    petStatus,
    getAuthConfig(token)
  );
  return response;
}
export async function updateFosteredPet(petId, petStatus, token) {
  const response = await axios.post(
    `${BaseUrl}/pets/foster/${petId}`,
    petStatus,
    getAuthConfig(token)
  );
  return response;
}

export async function returnPet(petId, petStatus, token) {
  const response = await axios.post(
    `${BaseUrl}/pets/return/${petId}`,
    petStatus,
    getAuthConfig(token)
  );
  return response;
}

export async function getUserPets(petId, token) {
  const response = await axios.get(
    `${BaseUrl}/pets/user/${petId}`,
    getAuthConfig(token)
  );
  return response.data;
}

export async function savePets(petId, isSaved, token) {
  const response = await axios.post(
    `${BaseUrl}/pets/save/${petId}`,
    isSaved,
    getAuthConfig(token)
  );
  return response.data;
}

export async function getUsersSavedPets(petId, token) {
  const response = await axios.get(
    `${BaseUrl}/pets/user/save/${petId}`,
    getAuthConfig(token)
  );
  return response.data;
}

export async function getUserInfo(userId, token) {
  const response = await axios.get(
    `${BaseUrl}/signup/user/${userId}`,
    getAuthConfig(token)
  );
  return response.data;
}
export async function updateUserInfo(userId, userInfo, token) {
  const response = await axios.put(
    `${BaseUrl}/signup/user/${userId}`,
    userInfo,
    getAuthConfig(token)
  );
  return response.data;
}

export async function deleteSavedPet(petId, token) {
  const response = await axios.delete(
    `${BaseUrl}/pets/save/${petId}`,
    getAuthConfig(token)
  );
  return response.data;
}

export async function getPetData(petId, token) {
  const response = await axios.get(
    `${BaseUrl}/pets/pet/${petId}`,
    getAuthConfig(token)
  );
  return response.data;
}

export async function getPetType(type) {
  const response = await axios.get(
    `${BaseUrl}/pets/type/${type}`
    // getAuthConfig(token)
  );
  return response.data;
}

// export async function getPetAdvancedSearch(
//   adoption,
//   height,
//   weight,
//   type,
//   name,

// ) {
//   const response = await axios.get(
//     `${BaseUrl}/pets/type/${adoption}/${height}/${weight}/${type}/${name}`
//     // getAuthConfig(token)
//   );
//   return response.data;
// }

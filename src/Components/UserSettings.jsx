import { useEffect, useState } from "react";
import { useAuth } from "../context/auth";
import { getUserInfo, updateUserInfo } from "../Lib/api";
import { v4 as uuidv4 } from "uuid";
const UserSettings = () => {
  const userId = uuidv4();
  const auth = useAuth();
  const [isSaved, setSaved] = useState(false);
  const [isNotEditable, setEditable] = useState(true);
  const [userInfo, setUserInfo] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    bio: "",
    password_hash: "",
  });
  useEffect(() => {
    const authToken = auth.token.data ? auth.token.data.token : auth.token;
    getUserInfo(userId, authToken).then((data) => {
      setUserInfo(data[0]);
      console.log(authToken);
    });
  }, []);

  const SaveUserSettings = () => {
    setEditable(false);
  };

  const saveChanges = async () => {
    try {
      await updateUserInfo(userId, userInfo, auth.token);
    } catch {
      return new Error();
    }
    setSaved(true);
  };

  function handleChange(event) {
    const value = event.target.value;
    setUserInfo({
      ...userInfo,
      [event.target.name]: value,
    });
  }

  return (
    <div>
      <form className="UserProfile" onSubmit={(e) => e.preventDefault()}>
        <h3>YOUR PROFILE, {userInfo.first_name}</h3>
        <div className="gridWrapper">
          <input
            disabled={isNotEditable}
            className="inputField"
            type="text"
            value={userInfo.first_name}
            name="first_name"
            onChange={handleChange}
            placeholder={userInfo.first_name}
            onFocus={() => {
              setSaved(false);
            }}
          />
          <input
            onFocus={() => {
              setSaved(false);
            }}
            disabled={isNotEditable}
            className="inputField"
            type="text"
            value={userInfo.last_name}
            name="last_name"
            onChange={handleChange}
          />
          <input
            onFocus={() => {
              setSaved(false);
            }}
            disabled={isNotEditable}
            className="inputField"
            type="email"
            value={userInfo.email}
            name="email"
            onChange={handleChange}
          />
          <input
            onFocus={() => {
              setSaved(false);
            }}
            disabled={isNotEditable}
            className="inputField"
            type="tel"
            value={userInfo.phone_number}
            name="phone_number"
            onChange={handleChange}
          />
          <input
            onFocus={() => {
              setSaved(false);
            }}
            disabled={isNotEditable}
            className="inputField"
            type="password"
            value={userInfo.password_hash}
            name="password_hash"
            onChange={handleChange}
          />
          <input
            onFocus={() => {
              setSaved(false);
            }}
            disabled={isNotEditable}
            className="inputField"
            type="text"
            name="bio"
            value={userInfo.bio}
            onChange={handleChange}
          />

          {isNotEditable ? (
            <button
              className="submitBtn"
              disabled={false}
              onClick={SaveUserSettings}
            >
              EDIT
            </button>
          ) : (
            <div>
              {isSaved && (
                <div id="saved-changes">Your changes have been saved! </div>
              )}
              <button className="submitBtn" onClick={saveChanges}>
                SAVE
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default UserSettings;

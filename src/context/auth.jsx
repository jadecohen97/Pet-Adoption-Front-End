import { createContext, useContext, useEffect, useState } from "react";
import localforage from "localforage";

export const AuthContext = createContext({
  isInitiallyLoaded: false,
  token: "",
  // userId: '',
  saveToken: async (token) => {},
  removeToken: async () => {},
});

const tokenKey = "userToken";

export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = (props) => {
  const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
  const [token, setToken] = useState("");
  // const [userId, setUserId] = useState('');
  const saveToken = async (token) => {
    setToken(token);
    console.log("in saveToken:", token.data.token);
    await localforage.setItem(tokenKey, token.data.token);
  };

  useEffect(() => {
    localforage.getItem(tokenKey).then((token) => {
      if (token) {
        setToken(token);
        console.log("getting item token in auth:", token);
      }
      setIsInitiallyLoaded(true);
    });
  }, []);

  const removeToken = async () => {
    setToken();
    console.log("in removeToken", token);
    await localforage.removeItem(tokenKey);
  };

  console.log("Auth provider token:", token);
  return (
    <AuthContext.Provider
      value={{ token, isInitiallyLoaded, saveToken, removeToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

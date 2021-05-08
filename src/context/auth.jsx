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

  // const authToken = token && token.data ? token.data.token : token;
  console.log("token", token);

  const saveToken = async (token) => {
    setToken(token);
    await localforage.setItem(tokenKey, token.data.token);
  };

  useEffect(() => {
    localforage.getItem(tokenKey).then((token) => {
      if (token) {
        setToken(token);
      }
      setIsInitiallyLoaded(true);
    });
  }, []);

  const removeToken = async () => {
    setToken();
    await localforage.removeItem(tokenKey);
  };

  return (
    <AuthContext.Provider
      value={{ token, isInitiallyLoaded, saveToken, removeToken }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;

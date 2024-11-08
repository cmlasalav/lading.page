import { createContext, useContext, useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { jwtDecode as jwt_decode } from "jwt-decode";
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userAuthenticated, setUserAuthenticated] = useState();
  const auth = getAuth();

  //Get Token
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    if (userToken) {
      setToken(userToken);
    }
    //Save Token
    const logout = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUserAuthenticated(currentUser);
        try {
          const token = await currentUser.getIdToken();
          setToken(token);
          localStorage.setItem("userToken", token);
          const decodedToken = jwt_decode(token);
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = Date.now();
          const timeUntilExpiration = expirationTime - currentTime;

          const updateTokenBeforeExpiration = timeUntilExpiration - 60 * 1000;
          if (updateTokenBeforeExpiration > 0) {
            setTimeout(
              () => refreshIdToken(currentUser),
              updateTokenBeforeExpiration
            );
          } else {
            await SignOut();
          }
        } catch (error) {
          console.error("Token error: ", error);
        }
      } else {
        setUserAuthenticated(null);
        setToken(null);
        localStorage.removeItem("userToken");
      }
    });

    return () => logout();
  }, [auth]);

  const refreshIdToken = async (currentUser) => {
    try {
      const newToken = await currentUser.getIdToken(true);
      setToken(newToken);
      localStorage.setItem("userToken", newToken);

      const decodedToken = jwt_decode(newToken);
      const expirationTime = decodedToken.exp * 1000;
      const currentTime = Date.now();
      const timeUntilExpiration = expirationTime - currentTime;

      const updateTokenBeforeExpiration = timeUntilExpiration - 60 * 1000;
      if (updateTokenBeforeExpiration > 0) {
        setTimeout(
          () => refreshIdToken(currentUser),
          updateTokenBeforeExpiration
        );
      } else {
        await SignOut();
      }
    } catch (error) {
      console.error("Error refrescando el token:", error);
      await SignOut();
    }
  };

  //Sign out function
  const SignOut = async () => {
    try {
      await signOut(auth);
      setToken(null);
      localStorage.removeItem("userToken");
    } catch (error) {
      console.log(error);
    }
  };

  const tokenValue = {
    token,
    setToken,
    SignOut,
    userAuthenticated,
  };
  return (
    <AuthContext.Provider value={tokenValue}>{children}</AuthContext.Provider>
  );
}

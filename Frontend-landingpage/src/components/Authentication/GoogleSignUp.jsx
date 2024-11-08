import axios from "axios";
import { FormattedMessage } from "react-intl";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuth } from "../../context/authContext.js";
import { useError } from "../../context/errorContext.js";
import { useUserName } from "../../context/userContext.js";
import GoogleLogo from "../../assets/google-icon.png";
import { useState } from "react";
import Loader from "../Parts/Loader.jsx";

const GoogleURL = process.env.REACT_APP_MongoDB_Google_SignUp_URL;

export default function GoogleSignUp({ handleCloseModal, lang }) {
  const { setError } = useError();
  const { setToken } = useAuth();
  const { setUserName } = useUserName();
  const auth = getAuth();
  const [loader, setLoader] = useState(false);

  const handlerGoogleSignUp = async (e) => {
    e.preventDefault();
    setError(null);
    setLoader(true);
    try {
      //Google PopUp
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      //User
      const user = result.user;
      const { displayName } = user;

      //User to Database
      const Token = await user.getIdToken();
      const response = await axios.post(GoogleURL, {
        token: Token,
        name: displayName,
      });

      //User data
      if (response.status === 200) {
        setToken(Token);
        setUserName(displayName);
        handleCloseModal();
      }
      //Errors
    } catch (error) {
      if (error.response && error.response.data) {
        const errorCode = error.response.data.errorInfo?.code;
        if (errorCode === "auth/invalid-input") {
          setError("login.email.error");
        } else if (errorCode === "server/error") {
          setError("signUp.google.error");
        }
      } else {
        if (error.code === "auth/popup-closed-by-user") {
          setError("signUp.google.error.popUp");
        } else {
          setError("signUp.google.error");
        }
      }
    } finally {
      setLoader(false);
    }
  };
  return (
    <>
      {loader && <Loader duration={3000} />}
      <div className="google-login">
        <button className="Google-Button" onClick={handlerGoogleSignUp}>
          <img className="google-logo" src={GoogleLogo} alt="Google"></img>
          <FormattedMessage id={lang} defaultMessage="Sign in with Google" />
        </button>
      </div>
    </>
  );
}

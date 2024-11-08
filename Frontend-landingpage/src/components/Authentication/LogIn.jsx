import axios from "axios";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { auth, signInWithEmailAndPassword } from "../../firebase-config.js";
import { useAuth } from "../../context/authContext.js";
import { useError } from "../../context/errorContext.js";
import { useUserName } from "../../context/userContext.js";
import GoogleSignUp from "./GoogleSignUp.jsx";
import VisibilityLogo from "../../assets/visibility - password.png";
import HiddenLogo from "../../assets/hidden - password.png";
import Loader from "../Parts/Loader.jsx";

const LoginURL = process.env.REACT_APP_MongoDB_Login_URL;

export default function Login({ handleCloseModal, onSignUpClick, message }) {
  //Context
  const { setError } = useError();
  const { setToken } = useAuth();
  const { setUserName } = useUserName();
  //Modal States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  //Loader
  const [loader, setLoader] = useState(false);

  //Handle changes && Passwrod visibility
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const passwordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoader(true);
    try {
      //User authentication
      const userLogin = await signInWithEmailAndPassword(auth, email, password);
      //Token Backend
      const token = await userLogin.user.getIdToken();
      const response = await axios.post(LoginURL, { token });
      if (response.status === 200) {
        const userName = response.data.userData.name;
        setToken(token);
        setUserName(userName);
        handleCloseModal();
      }
      //Errors
    } catch (error) {
      if (
        error.code === "auth/invalid-email" ||
        error.code === "auth/invalid-credential"
      ) {
        setError("login.email.error");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader duration={3000} />}
      {message && (
        <p className="success-message">
          <FormattedMessage
            id={message}
            defaultMessage="Registration successful! Please log in."
          />
        </p>
      )}
      <div className="content-form-login-signup">
        <p>
          <FormattedMessage id="login.title" defaultMessage="Login" />
        </p>
        <p>
          <FormattedMessage id="modal.email" defaultMessage="Email" />
        </p>
        <input type="email" value={email} onChange={handleEmailChange}></input>
        <p>
          <FormattedMessage id="login.password" defaultMessage="Password" />
        </p>
        <div className="password-input-container-login">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span onClick={passwordVisibility}>
            <img
              src={showPassword ? HiddenLogo : VisibilityLogo}
              alt={showPassword ? "Hide Password" : "Show Password"}
            />
          </span>
        </div>
      </div>
      <button className="login-signup-form-button" onClick={handleSubmit}>
        <FormattedMessage id="login.button" defaultMessage="Login" />
      </button>
      <GoogleSignUp handleCloseModal={handleCloseModal} lang="login.google" />
      <div className="signup-login-container">
        <label>
          <FormattedMessage
            id="login.paragraph"
            defaultMessage="You don't have an account?"
          />
        </label>
        <button className="button-signup-login" onClick={onSignUpClick}>
          <FormattedMessage id="login.text.button" defaultMessage="Sign Up" />
        </button>
      </div>
    </>
  );
}

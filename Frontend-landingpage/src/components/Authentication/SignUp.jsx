import axios from "axios";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useError } from "../../context/errorContext.js";
import VisibilityLogo from "../../assets/visibility - password.png";
import HiddenLogo from "../../assets/hidden - password.png";
import GoogleSignUp from "./GoogleSignUp.jsx";
import Loader from "../Parts/Loader.jsx";

const SignUpURL = process.env.REACT_APP_MongoDB_SignUp_URL;

export default function SignUp({ handleCloseModal, onLoginClick, setMessage }) {
  const { setError } = useError();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const passwordVisibility = () => setShowPassword(!showPassword);

  //User handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoader(true);
    try {
      //User in database
      const response = await axios.post(SignUpURL, user);
      if (response.status === 201) {
        setMessage("modal.success.login")
        onLoginClick();
      }
      //Errors
    } catch (error) {
      const errorCode = error.response.data.errorInfo.code;
      if (errorCode === "auth/email-already-exists") {
        setError("signUp.email.error");
      } else if (errorCode === "auth/invalid-email") {
        setError("signUp.invalid.email");
      } else if (errorCode === "auth/invalid-password") {
        setError("signUp.password.error");
      } else if (errorCode === "auth/invalid-input") {
        setError("signUp.invalid.input");
      }
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader duration={3000} />}
      <div className="content-form-login-signup">
        <p>
          <FormattedMessage id="signUp.title" defaultMessage="Sign Up" />
        </p>
        <p>
          <FormattedMessage id="signUp.name" defaultMessage="Name:" />
        </p>
        <input
          type="text"
          name="name"
          value={user.name}
          onChange={handleChange}
        />
        <p>
          <FormattedMessage id="modal.email" defaultMessage="Email" />
        </p>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
        <p>
          <FormattedMessage id="signUp.password" defaultMessage="Password" />
        </p>
        <div className="password-input-container-signup">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={user.password}
            onChange={handleChange}
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
        <FormattedMessage id="signUp.button" defaultMessage="Sign In" />
      </button>
      <GoogleSignUp handleCloseModal={handleCloseModal} lang="signUp.google" />
      <div className="signup-login-container">
        <label>
          <FormattedMessage
            id="signUp.paragraph"
            defaultMessage="Already have an account?"
          />
        </label>
        <button className="button-signup-login" onClick={onLoginClick}>
          <FormattedMessage id="signUp.text.button" defaultMessage="Login" />
        </button>
      </div>
    </>
  );
}

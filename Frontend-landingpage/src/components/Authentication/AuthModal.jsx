import { useError } from "../../context/errorContext.js";
import { FormattedMessage } from "react-intl";
import ErrorAuth from "../Parts/ErrorAuth.jsx";
import Login from "./LogIn.jsx";
import SignUp from "./SignUp.jsx";
import { useState } from "react";

export default function AuthModal({
  handleCloseModal,
  onSignUpClick,
  onLoginClick,
  isSignUp,
}) {
  //Error Context
  const { error } = useError();
  const [message, setMessage] = useState();

  return (
    <div className="modal-overlay">
      <div
        className={`modal-content ${isSignUp ? "modal-signup-content" : ""}`}
      >
        <button className="form-X-button" onClick={handleCloseModal}>
          <FormattedMessage id="login.close" defaultMessage="Close" />
        </button>

        {!isSignUp ? (
          <>
            <Login
              handleCloseModal={handleCloseModal}
              onSignUpClick={onSignUpClick}
              message={message}
            />
            {error && <ErrorAuth />}
          </>
        ) : (
          <>
            <SignUp
              handleCloseModal={handleCloseModal}
              onLoginClick={onLoginClick}
              setMessage={setMessage}
            />
            {error && <ErrorAuth />}
          </>
        )}
      </div>
    </div>
  );
}

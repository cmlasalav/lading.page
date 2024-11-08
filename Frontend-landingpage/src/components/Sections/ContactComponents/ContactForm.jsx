import axios from "axios";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import EmailError from "../../Parts/EmailError.jsx";
import Loader from "../../Parts/Loader.jsx";

const NodeMailerURL = process.env.REACT_APP_MongoDB_Nodemailer_URL;

export default function ContactForm() {
  const [error, setError] = useState();
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loader, setLoader] = useState(false);

  //Form change
  const handleChangeForm = (e) => {
    const { name, value } = e.target;
    setUserForm((prevUserForm) => ({ ...prevUserForm, [name]: value }));
  };

  //Input check
  const checkInputs = () => {
    if (
      userForm.name === "" ||
      userForm.email === "" ||
      userForm.phone === "" ||
      userForm.message === ""
    ) {
      setError("form.input.error");
      return false;
    }
    return true;
  };

  //Clear inputs
  const cleanInput = () => {
    setUserForm({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  //Handle email form
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setLoader(true);
    if (!checkInputs()) {
      return;
    }
    try {
      //Email form
      const response = await axios.post(NodeMailerURL, userForm);
      if (response.status === 200) {
        setError("form.email.message");
        cleanInput();
      } else {
        setError("form.email.error.message");
      }
    } catch (error) {
      setError("form.email.error.message");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader duration={3000} />}
      <div className="card-form">
        <form className="form-contact">
          <p className="form-header">
            <FormattedMessage id="form.name" defaultMessage="Name" />
          </p>
          <div className="contact-input">
            <input
              type="text"
              name="name"
              value={userForm.name}
              onChange={handleChangeForm}
              required
            />
            <p className="form-header">
              <FormattedMessage id="form.email" defaultMessage="Email" />
            </p>
            <input
              type="email"
              name="email"
              value={userForm.email}
              onChange={handleChangeForm}
              required
            />
            <p className="form-header">
              <FormattedMessage id="form.phone" defaultMessage="Phone" />
            </p>
            <input
              type="text"
              name="phone"
              value={userForm.phone}
              onChange={handleChangeForm}
              required
            />

            <p className="form-header">
              <FormattedMessage
                id="form.message"
                defaultMessage="Tell us how can we hel you / Nice to liste about you"
              />
            </p>
            <input
              type="text"
              name="message"
              value={userForm.message}
              onChange={handleChangeForm}
              required
            />
          </div>
        </form>
        <EmailError error={error} />
        <button
          className="sendMessage"
          style={{
            position: "sticky",
            left: "50rem",
          }}
          onClick={handleSubmitForm}
        >
          <FormattedMessage
            id="message.button"
            defaultMessage="Send a Message"
          />
        </button>
      </div>
    </>
  );
}

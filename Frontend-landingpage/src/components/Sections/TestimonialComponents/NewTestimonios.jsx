import axios from "axios";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useUserName } from "../../../context/userContext";
import { useAuth } from "../../../context/authContext";

const TestimonialsURL = process.env.REACT_APP_MongoDB_Testimonials_URL;

export default function NewTestimonios({
  onCancel,
  setModalMessage,
  setConfirm,
  setErrorModal,
}) {
  const { userName } = useUserName();
  const { token } = useAuth();
  const [testimonial, setTestimonial] = useState({
    User: token,
    TestimonialBody: "",
  });

  //Handle change data testimonial
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial((prevTestimonial) => ({
      ...prevTestimonial,
      [name]: value,
    }));
  };

  //Post Testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //Post testimonial
      const response = await axios.post(TestimonialsURL, testimonial);
      if (response.status === 201) {
        setConfirm("modal.confirm.testimonial");
        setTestimonial("");
      }
    } catch (error) {
      setModalMessage("modal.error.testimonial");
      setErrorModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form">
      <label>
        <FormattedMessage id="form.author" defaultMessage="Author: " />
        <input type="text" value={userName} required readOnly />
      </label>
      <br />
      <label>
        <FormattedMessage
          id="testimonial.body"
          defaultMessage="Testimonial: "
        />
      </label>
      <textarea
        value={testimonial.TestimonialBody}
        name="TestimonialBody"
        onChange={handleChange}
        required
      />

      <br />
      <div className="form-buttons">
        <button className="form-button" type="submit">
          <FormattedMessage
            id="testimonial.form.button"
            defaultMessage="Send Testimonial"
          />
        </button>
        <button className="form-button" type="button" onClick={onCancel}>
          <FormattedMessage id="form.cancel" defaultMessage="Cancel" />
        </button>
      </div>
    </form>
  );
}

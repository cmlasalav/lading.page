import axios from "axios";
import { FormattedMessage, FormattedDate } from "react-intl";
import { useState, useEffect } from "react";
import { useAuth } from "../../../context/authContext";
import AuthorName from "../../Parts/AuthorName";
import Loading from "../../Parts/Loading";
import DeleteButton from "../../Parts/DeleteButton";

const TestimonialsURL = process.env.REACT_APP_MongoDB_Testimonials_URL;

export default function Testimonials({ setModalMessage, setErrorModal, rol, setConfirm }) {
  const { token } = useAuth();
  const [testimonials, setTestimonials] = useState([]);

  //Get all testimonials
  useEffect(() => {
    const FetchTestimonials = async () => {
      try {
        const response = await axios.get(TestimonialsURL);
        if (response.status === 201) {
          const dateTestimonials = response.data.sort(
            (a, b) => new Date(b.TestimonialDate) - new Date(a.TestimonialDate)
          );
          setTestimonials(dateTestimonials);
        } else if (response.status === 500) {
          setModalMessage("modal.general.error");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.general.error");
        setErrorModal(true);
      }
    };
    FetchTestimonials();
  }, [token]);

  //Rendet testimonials
  const renderTestimonials = () => {
    return testimonials.map((testimonials, index) => (
      <div key={index} className="genera-testimonials">
        <p>{testimonials.TestimonialBody}</p>
        <p id="userTestimonial">
          - <AuthorName authorToken={testimonials.User} />
        </p>
        <p className="blog-date">
          <FormattedDate
            value={testimonials.TestimonialDate}
            year="numeric"
            month="long"
            day="numeric"
            weekday="long"
          />
        </p>
        {rol !== "user" ? (
          <DeleteButton
            setModalMessage={setModalMessage}
            setErrorModal={setErrorModal}
            setConfirm={setConfirm}
            typeButton="testimonials"
            Id={testimonials._id}
          />
        ) : null}
      </div>
    ));
  };

  return (
    <>
      <Loading data={testimonials} messageLoading="loading.testimonials" />
      {rol !== "user" && testimonials.length > 0 && (
        <h1 className="title-admin">
          <FormattedMessage
            id="profile.testimonials.admin.title"
            defaultMessage="All Testimonials"
          />
        </h1>
      )}
      {/*Profile testimonials*/}
      {rol !== "user" ? (
        <div className="testimonial-admin-container">
          {renderTestimonials()}
        </div>
      ) : (
        renderTestimonials()
      )}
    </>
  );
}

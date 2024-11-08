import { useState } from "react";
import { FormattedMessage } from "react-intl";
import AddNew from "../../Parts/AddNew";
import NewTestimonios from "./NewTestimonios";
import Testimonials from "./Testimonials";

export default function SectionTestimonials({
  setModalMessage,
  setConfirm,
  setErrorModal,
}) {
  const [newTestimonial, setNewTestimonial] = useState(false);

  //Handle testimonial form
  const handleNewTestimonials = () => {
    setNewTestimonial(true);
  };

  const handleCancelTestimonials = () => {
    setNewTestimonial(false);
  };

  return (
    <section id="GeneraTestimonials">
      <h1>
        <span className="first-word">
          <FormattedMessage
            id="section.testimonials.title1"
            defaultMessage="Cliente"
          />
        </span>{" "}
        <span className="second-word">
          <FormattedMessage
            id="section.testimonials.title2"
            defaultMessage="Testimonials"
          />
        </span>
      </h1>
      <div className="testimonial-container">
        {!newTestimonial && (
          //New testimonial button
          <AddNew
            onNewTestimonial={handleNewTestimonials}
            viewType="testimonial"
            lang="testimonial.add.new"
            setModalMessage={setModalMessage}
            setErrorModal={setErrorModal}
          />
        )}
        {newTestimonial && (
          //Form
          <NewTestimonios
            onCancel={handleCancelTestimonials}
            setModalMessage={setModalMessage}
            setConfirm={setConfirm}
            setErrorModal={setErrorModal}
          />
        )}
        <Testimonials
          setModalMessage={setModalMessage}
          setErrorModal={setErrorModal}
          rol="user"
        />
      </div>
    </section>
  );
}

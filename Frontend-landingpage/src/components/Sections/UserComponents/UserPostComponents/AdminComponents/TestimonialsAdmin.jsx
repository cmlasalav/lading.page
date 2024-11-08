import Testimonials from "../../../TestimonialComponents/Testimonials.jsx";

export default function TestimonialsAdmin({ setErrorModal, setModalMessage, setConfirm, userView }) {
  return (
    <>
    {/*Testimonials admin*/}
      <Testimonials
        setErrorModal={setErrorModal}
        setModalMessage={setModalMessage}
        setConfirm={setConfirm}
        rol={userView}
      />
    </>
  );
}

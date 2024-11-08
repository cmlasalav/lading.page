import axios from "axios";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

const PostURL = process.env.REACT_APP_MongoDB_Blog_URL;
const CommentURL = process.env.REACT_APP_MongoDB_Comment_URL;
const TestimonialsURL = process.env.REACT_APP_MongoDB_Testimonials_URL;
export default function DeleteButton({
  Id,
  typeButton,
  setConfirm,
  setModalMessage,
  setErrorModal,
}) {

  const DeletePost = async () => {
    //Comment
    if (typeButton === "comment") {
      try {
        const response = await axios.delete(`${CommentURL}/${Id}`);
        if (response.status === 200) {
          setConfirm("modal.deleted.comment");
        }
      } catch (error) {
        setModalMessage("modal.error.deleted.comment");
        setErrorModal(true);
      }
      //Testimonials
    } else if (typeButton === "testimonials") {
      try {
        const response = await axios.delete(`${TestimonialsURL}/${Id}`);
        if (response.status === 201) {
          setConfirm("modal.deleted.testimonial");
        }
        
      } catch (error) {
        setModalMessage("modal.error.deleted.testimonial");
        setErrorModal(true);
      }
      //Post
    } else {
      try {
        const response = await axios.delete(`${PostURL}/${Id}`);
        if (response.status === 200) {
          setConfirm("modal.deleted.post");
        }
      } catch (error) {
        setModalMessage("modal.error.deleted.post");
        setErrorModal(true);
      }
    }
  };

  const buttonClass =
    typeButton === "comment"
      ? "delete-button-comment"
      : typeButton === "testimonials"
      ? "delete-button-testimonial"
      : "delete-button-post";
  const buttonMessageId =
    typeButton === "comment"
      ? "comment.delete.button"
      : typeButton === "testimonials"
      ? "testimonial-delete-button"
      : "post.delete.button";
  return (
    <button className={buttonClass} onClick={DeletePost}>
      <FormattedMessage id={buttonMessageId} defaultMessage="Delete" />
    </button>
  );
}

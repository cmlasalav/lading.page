import axios from "axios";
import { FormattedMessage } from "react-intl";
import { useContext, useState } from "react";
import { langContext } from "../../context/langContext.js";
import CommentForm from "../BlogComponents/CommentComponents/ComentariosForm.jsx";

const PostURL = process.env.REACT_APP_MongoDB_Blog_URL;
const CommentURL = process.env.REACT_APP_MongoDB_Comment_URL;
const TagsByIdsURL = process.env.REACT_APP_MongoDB_Tags_Id_URL;

export default function EditButton({
  Id,
  typeButton,
  setConfirm,
  setModalMessage,
  setErrorModal,
  onNewPost,
}) {
  const { locale } = useContext(langContext);
  //Edit Comment
  const [commentSelected, setCommentSelected] = useState([]);
  //View CommentForm
  const [showcommentForm, setShowCommentForm] = useState();

  const closeForm = () => {
    setShowCommentForm(false);
  };

  //Handle edit button
  const handleEditPostComment = async (data, typeEdit) => {
    //Comment
    if (typeEdit === "comment") {
      const commentEdited = commentSelected._id;
      try {
        const response = await axios.put(`${CommentURL}/${commentEdited}`, {
          Body: data,
        });
        if (response.status === 200) {
          setConfirm("modal.edit.comment");
          closeForm();
        }
      } catch (error) {
        setModalMessage("modal.error.edit.comment");
        setErrorModal(true);
      }
    } else {
      setModalMessage("modal.error.edit");
      setErrorModal(true);
    }
  };

  //Handle get Post and Comment
  const Edit_Post_Comment = async () => {
    if (typeButton === "comment") {
      //Get Comment by Id
      try {
        const response = await axios.get(`${CommentURL}/userComment/${Id}`);
        if (response.status === 200) {
          const commentUser = response.data;
          setCommentSelected(commentUser);
          setShowCommentForm(true);
        }
      } catch (error) {
        setModalMessage("modal.error.comment.get");
        setErrorModal(true);
      }
    } else {
      //Get Post by Id
      try {
        const response = await axios.get(`${PostURL}/${Id}`);
        if (response.status === 200) {
          const post = response.data;
          const tagsResponse = await axios.post(TagsByIdsURL, {
            ids: post.IdTags,
          });
          if (response.status === 200) {
            post.IdTags = tagsResponse.data.map((tag) => tag._id);
            post.TagsSeleccionados_ES = tagsResponse.data.map((tag) => tag.Tags_ES);
            post.TagsSeleccionados_EN = tagsResponse.data.map((tag)=>tag.Tags_EN)
          }
          onNewPost(post);
        }
      } catch (error) {
        setModalMessage("modal.error.post.get");
        setErrorModal(true);
      }
    }
  };

  //Button class and lang
  const buttonClass =
    typeButton === "comment"
      ? "edit-button-comment"
      : `edit-button-post${locale}`;
  const buttonMessageId =
    typeButton === "comment" ? "comment.edit.button" : "post.edit.button";
  return (
    <>
      <button className={buttonClass} onClick={Edit_Post_Comment}>
        <FormattedMessage id={buttonMessageId} defaultMessage="Edit" />
      </button>
      {showcommentForm && (
        <div className="form-edit-comment">
          <CommentForm
            onEditComment={handleEditPostComment}
            editComment={commentSelected}
            closeForm={closeForm}
          />
        </div>
      )}
    </>
  );
}

import axios from "axios";
import { useState, useEffect } from "react";
import { FormattedMessage, FormattedDate } from "react-intl";
import { useAuth } from "../../../context/authContext.js";
import CommentForm from "./ComentariosForm.jsx";
import CommentButton from "./CommentButton.jsx";
import AuthorName from "../../Parts/AuthorName.jsx";

const ComentariosURL = process.env.REACT_APP_MongoDB_Comment_URL;

const Comentarios = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noComments, setNoComments] = useState();
  const [replyingTo, setReplyingTo] = useState(null);
  const [addingComment, setAddingComment] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (!postId) return;
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${ComentariosURL}/${postId}`);
        const comments = response.data;
        setComments(comments);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setComments([]);
          if (error.response.data.message) {
            setNoComments("comment.noComment.error");
          }
        } else {
          setError("comment.error");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchComments();
  }, [postId]);

  //Handle for new or reply comment
  const handleSubmit = async (newComment, parentId = null) => {
    const commentData = {
      IdComentario: Math.random().toString().substring(2, 9),
      Autor: token,
      Body: newComment,
      Active: true,
      IdPost: postId,
      IdComentarioPrincipal: parentId,
    };
    try {
      const response = await axios.post(ComentariosURL, commentData);
      if (response.data.IdPost === postId) {
        setComments([...comments, response.data]);
      }
      setReplyingTo(null);
      setAddingComment(false);
    } catch (error) {
      setError("comment.error");
    }
  };


//#region Form handlers
  
  const openReplyForm = (commentId) => {
    setReplyingTo(commentId);
    setAddingComment(false);
  };

  const openAddCommentForm = () => {
    setAddingComment(true);
    setReplyingTo(null);
  };

  const closeForm = () => {
    setReplyingTo(null);
    setAddingComment(false);
  };
  //#endregion

  //Comments and replies
  const renderComments = (commentsList, parentId = null) => {
    return commentsList
      .filter((comment) => comment.IdComentarioPrincipal === parentId)
      .map((comment) => (
        <div key={comment._id}>
          <div className={`comment ${parentId ? "comment-reply" : ""}`}>
            <p>
              <strong>
                <AuthorName authorToken={comment.Autor} />
              </strong>
              : {comment.Body}
            </p>
            <p>
              <FormattedDate
                value={comment.Fecha}
                year="numeric"
                month="long"
                day="numeric"
                weekday="long"
              />
            </p>
            {token !== null && (
              <span
                className="new-reply-comment"
                onClick={() => openReplyForm(comment._id)}
              >
                <FormattedMessage
                  id="comment.reply.button"
                  defaultMessage="Reply"
                />
              </span>
            )}
            {replyingTo === comment._id && (
              <CommentForm
                onSubmit={handleSubmit}
                closeForm={closeForm}
                parentId={comment._id}
              />
            )}
          </div>
          {renderComments(commentsList, comment._id)}
        </div>
      ));
  };

  return (
    <div>
      <h3>
        <FormattedMessage id="comment.title" defaultMessage="Comments" />
      </h3>
      {token !== null && (
        <CommentButton openAddCommentForm={openAddCommentForm} />
      )}
      {loading ? (
        <h1>
          <FormattedMessage
            id="comment.load"
            defaultMessage="Loading comments..."
          />
        </h1>
      ) : (
        <>
          {error && (
            <h3 className="error-comment">
              <FormattedMessage
                id={error}
                defaultMessage="Error loading comments."
              />
            </h3>
          )}
          {comments.length > 0 ? (
            <>{renderComments(comments)}</>
          ) : (
            <h3 className="error-comment">
              <FormattedMessage
                id={noComments}
                defaultMessage="No comments yet."
              />
            </h3>
          )}
          {addingComment && (
            <CommentForm onSubmit={handleSubmit} closeForm={closeForm} />
          )}
        </>
      )}
    </div>
  );
};

export default Comentarios;

import axios from "axios";
import { FormattedMessage, FormattedDate } from "react-intl";
import { useAuth } from "../../../context/authContext";
import { useState, useEffect } from "react";
import AuthorName from "../../Parts/AuthorName";
import DeleteButton from "../../Parts/DeleteButton";
import EditButton from "../../Parts/EditButton";
import Loading from "../../Parts/Loading";

const UserPostURL = process.env.REACT_APP_MongoDB_USER_POST_URL;

export default function CommentUser({
  onReadMore,
  setErrorModal,
  setModalMessage,
  userName,
  setConfirm,
  userView,
}) {
  const { token } = useAuth();
  const [usercomments, setUserComments] = useState([]);

  //Get comments by user
  useEffect(() => {
    const CommentUser = async () => {
      try {
        const response = await axios.get(`${UserPostURL}/comment/${token}`);
        if (response.status === 200) {
          const commentsUser = response.data;
          setUserComments(commentsUser);
        } else if (response.status === 404) {
          setUserComments("");
          setModalMessage("error.comment.user");
          setErrorModal(true);
        }
      } catch (error) {
        <Loading data={usercomments} messageLoading="loading.comment" />;
      }
    };
    if (token) {
      CommentUser();
    }
  }, [token]);

  return (
    <>
      <Loading data={usercomments} messageLoading="loading.comment" />
      {usercomments.length > 0 && (
        <h1 className="profie-title">
          <FormattedMessage
            id="profile.comment.title"
            defaultMessage="Comments"
          />{" "}
          {userName}
        </h1>
      )}
      {/*Comments cards*/}
      <div className="comments-container">
        {usercomments.map((comment, index) => (
          <div key={index} className="comment-user">
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
            {/*Read post*/}
            <button
              className="post-button"
              onClick={() => onReadMore(comment.IdPost, userView)}
            >
              <FormattedMessage
                id="comment.button.post"
                defaultMessage="View Post"
              />
            </button>
            {/*Delete comment button*/}
            <DeleteButton
              Id={comment._id}
              typeButton="comment"
              setConfirm={setConfirm}
              setModalMessage={setModalMessage}
              setErrorModal={setErrorModal}
            />
            {/*Edit comment button*/}
            <EditButton
              Id={comment._id}
              typeButton="comment"
              setConfirm={setConfirm}
              setModalMessage={setModalMessage}
              setErrorModal={setErrorModal}
            />
          </div>
        ))}
      </div>
    </>
  );
}

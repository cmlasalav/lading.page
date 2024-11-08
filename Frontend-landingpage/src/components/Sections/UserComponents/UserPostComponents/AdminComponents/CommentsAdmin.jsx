import axios from "axios";
import { useAuth } from "../../../../../context/authContext";
import { useEffect, useState } from "react";
import { FormattedMessage, FormattedDate } from "react-intl";
import AuthorName from "../../../../Parts/AuthorName";
import DeleteButton from "../../../../Parts/DeleteButton";
import Loading from "../../../../Parts/Loading";

const AdminURL = process.env.REACT_APP_MongoDB_Admin_URL;

export default function CommentsAdmin({
  onReadMore,
  setErrorModal,
  setModalMessage,
  setConfirm,
  userView,
}) {
  const { token } = useAuth();
  const [adminComments, setAdminComments] = useState([]);

  //Get all comments made 
  useEffect(() => {
    const AdminComments = async () => {
      try {
        const response = await axios.get(`${AdminURL}/Comments/${token}`);
        if (response.status === 200) {
          const AdminComments = response.data;
          setAdminComments(AdminComments);
        } else if (response.status === 500) {
          setModalMessage("modal.general.error");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.general.error");
        setErrorModal(true);
      }
    };
    if (token) {
      AdminComments();
    }
  }, [token]);

  return (
    <div className="title-admin">
      <Loading data={adminComments} messageLoading="loading.comment" />
      {adminComments.length > 0 && (
        <h1>
          <FormattedMessage
            id="profile.comment.admin.title"
            defaultMessage="All Comments"
          />
        </h1>
      )}
      {/*Comments card*/}
      <div className="comments-container">
        {adminComments.map((comment, index) => (
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
          </div>
        ))}
      </div>
    </div>
  );
}

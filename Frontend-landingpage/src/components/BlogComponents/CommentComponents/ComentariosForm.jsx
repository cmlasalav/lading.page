import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { useUserName } from "../../../context/userContext";

const CommentForm = ({
  onSubmit,
  closeForm,
  parentId = null,
  editComment,
  onEditComment,
}) => {
  const [comment, setComment] = useState("");
  const { userName } = useUserName();
  
  //Style and lang buttons
  const formButton = editComment ? "comment.form.edit" : "comment.form.send";
  const classButton = editComment ? "comment-form-edit-button" : "form-button";

  useEffect(() => {
    if (editComment) {
      setComment(editComment.Body);
    }
  }, [editComment]);

  //Handler Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editComment) {
      const typeEdit = "comment";
      onEditComment(comment, typeEdit);
    } else {
      onSubmit(comment, parentId);
      setComment("");
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
        <FormattedMessage id="comment.form.body" defaultMessage="Comment: " />
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </label>
      <br />
      <div className="form-buttons">
        <button className={classButton} type="submit">
          <FormattedMessage id={formButton} defaultMessage="Send" />
        </button>
        <button type="button" className="form-button" onClick={closeForm}>
          <FormattedMessage id="form.cancel" defaultMessage="Cancel" />
        </button>
      </div>
    </form>
  );
};

export default CommentForm;

import { FormattedMessage } from "react-intl";

export default function CommentButton({ openAddCommentForm }) {
  //Comment Button
  return (
    <button className="new-reply-comment"onClick={() => {
      openAddCommentForm();
    }}>
      <FormattedMessage id="comment.button" defaultMessage="New Comment" />
    </button>
  );
}

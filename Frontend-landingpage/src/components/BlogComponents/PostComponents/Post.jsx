import { FormattedDate, FormattedMessage } from "react-intl";
import AddNew from "../../Parts/AddNew.jsx";
import EditButton from "../../Parts/EditButton.jsx";
import DeleteButton from "../../Parts/DeleteButton.jsx";
import PostVisibility from "../../Sections/UserComponents/UserPostComponents/PostVisibility.jsx";

export default function Post({
  post,
  user,
  onNewPost,
  onReadMore,
  isVisible,
  setErrorModal,
  setModalMessage,
  setConfirm,
}) {

  //Posts first paragraph.
  const firstParagraph = (postBody) => {
    for (const content of postBody) {
      if (typeof content === "string") {
        return <p>{content}</p>;
      }
      if (typeof content === "object" && content.contentType === "text") {
        return <p>{content.contentBody}</p>;
      }
    }
    return null;
  };

  return (
    <div className="blog-card-container">
      {user === "user" && (
        //New post button
        <AddNew onNewPost={onNewPost} viewType="post" lang="blog.add.new" setModalMessage={setModalMessage} setErrorModal={setErrorModal} />
      )}
      {/*Post cards*/}
      {post.map((post, index) => {
        const firstImage = post.PostBody.find(
          (content) =>
            typeof content === "object" && content.contentType === "image"
        );
        return (
          <div key={index} className="blog-card">
            <div className="blog-image">
            {firstImage && (
              <img
                key={index}
                src={firstImage.contentBody}
                alt={post.Titulo} // Not image
              />
            )}
            </div>
            <p className="post-title">{post.Titulo}</p>
            <div className="post-body">{firstParagraph(post.PostBody)}</div>
            <p className="blog-date">
              <FormattedDate
                value={post.PostDate}
                year="numeric"
                month="long"
                day="numeric"
                weekday="long"
              />
            </p>
            {/*Read post*/}
            <button
              className="blog-button"
              onClick={() => onReadMore(post._id, user)}
            >
              <FormattedMessage id="blog.button" defaultMessage="Read More" />
            </button>
            {isVisible && (
              <>
              {/*Visibility paragraph*/}
                <PostVisibility isVisible={post.Active} />
                {/*Edit and Delete buttons*/}
                <DeleteButton
                  Id={post._id}
                  typeButton="post"
                  setConfirm={setConfirm}
                  setModalMessage={setModalMessage}
                  setErrorModal={setErrorModal}
                />
                {user === "user" && (
                  <EditButton
                    Id={post._id}
                    typeButton="post"
                    onNewPost={onNewPost}
                    setConfirm={setConfirm}
                    setModalMessage={setModalMessage}
                    setErrorModal={setErrorModal}
                  />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

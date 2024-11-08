import { FormattedMessage } from "react-intl";

export default function PostPreview({ postContent, title }) {
  //Post preview component
  return (
    <div className="post-prev">
      <label>
        <FormattedMessage id="newpost.preview" defaultMessage="Post Preview" />
      </label>
      <p id="prev-title">{title}</p>
      {postContent.map((item, index) => (
        <div className="post-prev-content" key={index}>
          {item.contentType === "text" ? (
            <p>{item.contentBody}</p>
          ) : (
            //Image preview
            <div className="prev-image">
              {(() => {
                const img = !item.previewURL
                  ? item.contentBody
                  : item.previewURL;
                return <img src={img} alt="Post Content" />;
              })()}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

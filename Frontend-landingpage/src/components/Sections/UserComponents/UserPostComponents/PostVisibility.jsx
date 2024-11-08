import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";

export default function PostVisibility({ isVisible }) {
  const [visibility, setVisibility] = useState("post.visibility.error");
  //Post visibility
  useEffect(() => {
    if (isVisible) {
      setVisibility("post.visibility.public");
    } else {
      setVisibility("post.visibility.private");
    }
  }, [isVisible]);

  return (
    <strong>
      <FormattedMessage
        id="post.visibility"
        defaultMessage="Error getting the visibility"
      />
      <FormattedMessage id={visibility} defaultMessage="" />
    </strong>
  );
}

import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";

export default function Loading({ data, children, messageLoading }) {
  const [message, setMessage] = useState("loading");
  //Loading paragraph
  useEffect(() => {
    const time = setTimeout(() => {
      setMessage(messageLoading);
    }, 5000);
    return () => clearTimeout(time);
  }, [messageLoading]);

  if (data.length === 0) {
    return (
      <h1 className="loading-part">
        {message === "loading" ? (
          <FormattedMessage
            id="loading.paragraph"
            defaultMessage="Loading data..."
          />
        ) : (
          <FormattedMessage
            id={messageLoading} 
            defaultMessage="No data available" 
          />
        )}
      </h1>
    );
  }

  return children;
}

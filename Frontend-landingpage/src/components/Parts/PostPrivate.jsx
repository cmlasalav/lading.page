import { FormattedMessage } from "react-intl";
import Error404 from "../../assets/404 error - icon.png";

export default function PrivatePost() {
  //Private Post
  return (
    <div className="post-private-page">
      <img src={Error404} alt="Error" />
      <p>
        <FormattedMessage
          id="post-private-page.title"
          defaultMessage="Post Private Page"
        />
      </p>
      <p>
        <FormattedMessage
          id="post-private-page.subtitle"
          defaultMessage="This is a private post page"
        />
      </p>
    </div>
  );
}

import TwitterLogo from "../../../assets/twitter - icon.png";
import FacebookLogo from "../../../assets/facebook - icon.png";
import { FormattedMessage } from "react-intl";

const XURL =process.env.REACT_APP_X_URL
const FacebookURL = process.env.REACT_APP_Facebook_URL 

export default function ConnectWithUs() {
  //Connect with us card
  return (
    <div className="genera-connect">
      <h1>
        <FormattedMessage
          id="socialmedia.title"
          defaultMessage="Connect with us"
        />
      </h1>
      <p>
        <FormattedMessage
          id="socialmedia.paragraph"
          defaultMessage="Stay connected and follow us on social media for updates and industry news."
        />
      </p>
      <div className="social-media">
        <a href={XURL}>
          <img src={TwitterLogo} alt="Twitter"></img>
        </a>
        <a href={FacebookURL}>
          <img src={FacebookLogo} alt="Facebook"></img>
        </a>
      </div>
    </div>
  );
}

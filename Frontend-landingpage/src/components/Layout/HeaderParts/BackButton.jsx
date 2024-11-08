import { FormattedMessage } from "react-intl";

export default function BackButton({onBack}) {
  return (
    <li>
      <button onClick={onBack} className="back-button">
        ← <FormattedMessage id="header.home" defaultMessage="Home" />
      </button>
    </li>
  );
}

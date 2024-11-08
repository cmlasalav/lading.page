import { FormattedMessage } from "react-intl";
import { useError } from "../../context/errorContext";

export default function ErrorAut() {
  const { error } = useError();

  //Error auth
  return (
    <div className="error-message-signup">
      <p>
        <FormattedMessage id={error} defaultMessage="An error occured" />
      </p>
    </div>
  );
}

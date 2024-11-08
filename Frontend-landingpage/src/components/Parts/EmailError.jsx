import { FormattedMessage } from "react-intl";

export default function EmailError({error}){
  //Message emamil error
    return (
        <div className="send-email">
          {error && (
            <p>
              <FormattedMessage id={error} defaultMessage="An error occured" />
            </p>
          )}
        </div>
    );
}
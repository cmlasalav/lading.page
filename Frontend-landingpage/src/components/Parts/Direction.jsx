import { FormattedMessage } from "react-intl";

export default function Direction() {
  return (
    <>
      <p>
        <FormattedMessage id="direction.address" defaultMessage="Address: " />
      </p>
      <p>
        <FormattedMessage id="direction.phone" defaultMessage="Phone: " />
        +1 (123) 456-7890
      </p>
      <p>
        <FormattedMessage id="direction.email" defaultMessage="Email: " />
        info@generaconsultinggroup.com
      </p>
    </>
  );
}

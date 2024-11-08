import { FormattedMessage } from "react-intl";
import ConnectWithUs from "./ConnectWithUs";
import ConnectDirection from "./ConnectDirection";
import ContactForm from "./ContactForm";


export default function Contact() {
  //Contact Section
  return (
    <section id="GeneraContact">
      <h1 className="first-word">
        <FormattedMessage id="section.contact" defaultMessage="Contact" />
      </h1>
      <div className="text-contact">
        <p className="subtitle-contact">
          <FormattedMessage
            id="contact.subtitle"
            defaultMessage="Get in Touch"
          />
        </p>
        <p className="description-contact">
          <FormattedMessage
            id="contact.paragraph"
            defaultMessage="Ready to elevate your business? Contact us today to schedule a consultation or learn more about our services."
          />
        </p>
      </div>
      <div className="contact-container">
        <div className="left-column">
          <ContactForm />
          <ConnectWithUs />
        </div>
        <ConnectDirection />
      </div>
    </section>
  );
}

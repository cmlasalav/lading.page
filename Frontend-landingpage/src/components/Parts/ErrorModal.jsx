import { FormattedMessage } from "react-intl";

export default function ErrorModal({ isOpen, onClose, modalMessage }) {
  //Modal normal error
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content-confirm-error">
        <div className="modal-image">
          <h2>
            <FormattedMessage
              id ={modalMessage}
              defaultMessage="Translate Error"
            />
          </h2>
        </div>
        <button className="modal-confirm-button" onClick={onClose}>
          <FormattedMessage id="modal.button.accept" default="Accept" />
        </button>
      </div>
    </div>
  );
}

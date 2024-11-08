import { FormattedMessage } from "react-intl";

export default function ConfirmModal({ isOpen, setConfirm, onClose }) {
  if (!isOpen) return null;

  //Succes Handler
  const handleSuccessModal = (e) => {
    e.preventDefault();
    setConfirm(isOpen);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content-confirm-error">
        <div className="modal-confirm">
          <h2>
            <FormattedMessage
              id="modal.confirm.question"
              defaultMessage="Are you sure you want to continue?"
            />
          </h2>
        </div>
        <button className="modal-confirm-button" onClick={handleSuccessModal}>
          <FormattedMessage id="modal.button.accept" default="Accept" />
        </button>
        <button className="modal-cancel-button" onClick={onClose}>
          <FormattedMessage id="form.cancel" default="Cancel" />
        </button>
      </div>
    </div>
  );
}

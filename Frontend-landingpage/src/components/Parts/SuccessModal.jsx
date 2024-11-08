import { useState, useEffect } from "react";
import { FormattedMessage } from "react-intl";
import Loader from "./Loader";

export default function SuccessModal({ isOpen, onClose, modalMessage }) {
  const [loader, setLoader] = useState(false);
  modalMessage = isOpen;
  //Success Modal
  useEffect(() => {
    if (isOpen) {
      setLoader(true);
      const timer = setTimeout(() => {
        setLoader(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {loader ? (
        <Loader duration={3000} />
      ) : (
        <div className="modal-overlay">
          <div className="modal-content-confirm-error">
            <div className="modal-confirm">
              <h2>
                <FormattedMessage
                  id={modalMessage}
                  defaultMessage="The action was completed."
                />
              </h2>
            </div>

            <button className="modal-confirm-button" onClick={onClose}>
              <FormattedMessage id="modal.button.accept" default="Accept" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

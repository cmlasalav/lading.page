import { FormattedMessage } from "react-intl";

export default function PostImages({
  onAddImageContent,
  setErrorModal,
  setModalMessage,
}) {

  //Images validation
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/svg+xml",
      ];
      if (!validTypes.includes(file.type)) {
        setModalMessage("modal.invalidate.image");
        setErrorModal(true);
        return;
      }
      //Preview Image
      onAddImageContent(file);
    }
  };

  return (
    <label>
      <FormattedMessage
        id="newpost.imageLink"
        defaultMessage="Add Image Link:"
      />
      <input
        className="input-image"
        type="file"
        accept="image/"
        onChange={handleImageChange}
      />
      <button
        type="button"
        className="button-image"
        onClick={() => document.querySelector('input[type="file"]').click()}
      >
        <FormattedMessage id="newpost.addImage" defaultMessage="Add Image" />
      </button>
    </label>
  );
}

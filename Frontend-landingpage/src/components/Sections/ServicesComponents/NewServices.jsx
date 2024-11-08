import axios from "axios";
import { useState } from "react";
import { FormattedMessage } from "react-intl";
import CheckIcon from "../../../assets/check-icon.png";

const ServicesURL = process.env.REACT_APP_MongoDB_Services_URL;
const ImageURL = process.env.REACT_APP_MongoDB_Blog_Image_URL;
const typeBucket = process.env.REACT_APP_Firebase_TypeBuckett_Services;

export default function NewServices({
  onCancel,
  setModalMessage,
  setErrorModal,
  setConfirm,
}) {
  const [services, setServices] = useState({
    ServicesName_EN: "",
    ServiceDescription_EN: "",
    ServicesName_ES: "",
    ServiceDescription_ES: "",
    ServiceImage: null,
  });
  const [validatedImage, setValidatedImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  //#region Changes
  //Image validation
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
      setImagePreview(URL.createObjectURL(file));
      setServices((prev) => ({
        ...prev,
        ServiceImage: file,
      }));
      setModalMessage("modal.validate.image");
      setErrorModal(true);
      setValidatedImage(true);
    }
  };

  //Text changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setServices((prevService) => ({
      ...prevService,
      [name]: value,
    }));
  };

  //#endregion

  //Image upload to buckett
  const uploadImage = async () => {
    if (validatedImage) {
      try {
        //Image Post
        const ImageData = new FormData();
        ImageData.append("imagesId", typeBucket);
        ImageData.append("images", services.ServiceImage);
        const ImageResponse = await axios.post(
          `${ImageURL}/Bucket.Images/${typeBucket}`,
          ImageData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (ImageResponse.status === 200) {
          //Service Image 
          const ImageURL = ImageResponse.data.map((item) => item.publicUrl);
          services.ServiceImage = ImageURL.join(", ");
        } else {
          setModalMessage("modal.invalidate.image");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.error.image");
        setErrorModal(true);
      }
    } else {
      setModalMessage("modal.invalidate.image");
      setErrorModal(true);
    }
  };

  //Services databse
  const handleSubmit = async (e) => {
    e.preventDefault();
    await uploadImage();
    try {
      //Post Service
      const response = await axios.post(ServicesURL, services);
      if (response.status === 201) {
        setConfirm("modal.confirm.services");
      }
    } catch (error) {
      setModalMessage("modal.error.service");
      setErrorModal(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="reply-form-services">
      <label>
        <FormattedMessage
          id="service.name.english"
          defaultMessage="Service name - english: "
        />
        <input
          type="text"
          name="ServicesName_EN"
          value={services.ServicesName_EN}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        <FormattedMessage
          id="service.description.english"
          defaultMessage="Service description - english: "
        />
        <input
          type="text"
          name="ServiceDescription_EN"
          value={services.ServiceDescription_EN}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        <FormattedMessage
          id="service.name.spanish"
          defaultMessage="Service name - spanish: "
        />
        <input
          type="text"
          name="ServicesName_ES"
          value={services.ServicesName_ES}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        <FormattedMessage
          id="service.description.spanish"
          defaultMessage="Service description - spanish:"
        />
        <input
          type="text"
          name="ServiceDescription_ES"
          value={services.ServiceDescription_ES}
          onChange={handleChange}
          required
        />
      </label>
      <br />
      <label>
        <FormattedMessage id="service.img" defaultMessage="Service image: " />
        <input
          className="input-image"
          type="file"
          name="ServiceImage"
          accept="image/"
          onChange={handleImageChange}
          required
        />
        <button
          type="button"
          className="button-image"
          onClick={() => document.querySelector('input[type="file"]').click()}
        >
          <FormattedMessage id="newpost.addImage" defaultMessage="Add Image" />
        </button>
        {!services.ServiceImage && (
          <p className="error-message">
            <FormattedMessage
              id="modal.error.add.image"
              defaultMessage="Please add an image before submitting."
            />
          </p>
        )}
        {imagePreview && (
          <img
            className="image-preview"
            src={imagePreview}
            alt="Preview"
          />
        )}
        {validatedImage && (
          <img className="check-icon" src={CheckIcon} alt="Validated" />
        )}
      </label>
      <br />
      <div className="form-buttons">
        <button className="form-button" type="submit">
          <FormattedMessage
            id="service.form.button"
            defaultMessage="Send Service"
          />
        </button>
        <button className="form-button" type="button" onClick={onCancel}>
          <FormattedMessage id="form.cancel" defaultMessage="Cancel" />
        </button>
      </div>
    </form>
  );
}

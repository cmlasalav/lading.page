import axios from "axios";
import { useAuth } from "../../context/authContext";
import { FormattedMessage } from "react-intl";
import NewIcon from "../../assets/add-newpost.png";
import { useEffect, useState } from "react";

const TokenURL = process.env.REACT_APP_MongoDB_Login_URL;

export default function AddNew({
  onNewPost,
  onNewTestimonial,
  onNewService,
  viewType,
  lang,
  setModalMessage,
  setErrorModal,
}) {
  const { token } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userRole = async () => {
      try {
        //Get user role
        const response = await axios.post(TokenURL, { token });
        const userRole = response.data.userData.role;
        setRole(userRole);
      } catch (error) {
        setModalMessage("modal.error.role");
        setErrorModal(true);
      }
    };
    if (token) {
      userRole();
    }
  }, [token]);

  //Views
  const handleView = () => {
    if (viewType === "post") {
      onNewPost();
    } else if (viewType === "testimonial") {
      onNewTestimonial();
    } else if (role !== "user" && viewType === "service") {
      onNewService();
    }
  };

  return (
    <>
      {token !== null && role && (
        <>
          {(viewType === "post" || viewType === "testimonial") && (
            <button
              className={
                viewType === "post" ? "new-post-card" : "new-testimonial-card"
              }
              onClick={handleView}
            >
              <img src={NewIcon} alt="Add" className="add-post-icon" />
              <p>
                <FormattedMessage id={lang} defaultMessage="Add" />
              </p>
            </button>
          )}
          {role !== "user" && viewType === "service" && (
            <>
              <button className="new-service-card" onClick={handleView}>
                <img src={NewIcon} alt="Add" className="add-post-icon" />
                <p>
                  <FormattedMessage id={lang} defaultMessage="Add" />
                </p>
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}

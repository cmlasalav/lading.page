import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { langContext } from "../../context/langContext";
import Loading from "../Parts/Loading";

const AboutUsURL = process.env.REACT_APP_MongoDB_AboutUs_URL;

export default function AboutUs({ setModalMessage, setErrorModal }) {
  const [aboutUs, setAboutUs] = useState([]);
  const { locale } = useContext(langContext);

  //Get company information
  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const response = await axios.get(AboutUsURL);
        if (response.status === 200) {
          const AboutUs = response.data;
          setAboutUs(AboutUs);
        } else {
          setModalMessage("modal.AboutUs.error");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.general.error");
        setErrorModal(true);
      }
    };
    fetchAboutUs();
  }, []);

  return (
    <section id="GeneraAboutUs">
      <h2>
        <span className="first-word">
          <FormattedMessage
            id="section.aboutUs.title1"
            defaultMessage="About"
          />{" "}
        </span>
        <span className="second-word">
          <FormattedMessage id="section.aboutUs.title2" defaultMessage="Us" />
        </span>
      </h2>
      <Loading data={aboutUs} messageLoading="loading.information" />
      <div className="card-container">
        {aboutUs.map((info, index) => (
          <div key={index} className="card">
            <div className="text-cards">
              <p className="title-card">
                {locale === "es-MX"
                  ? info.AboutUsTitle_ES
                  : info.AboutUsTitle_EN}
              </p>
              <p className="description-card">
                {locale === "es-MX"
                  ? info.AboutUsDescription_ES
                  : info.AboutUsDescription_EN}
              </p>
            </div>
            <div className="image-card ">
              {info.AboutUsImg && <img src={info.AboutUsImg} alt="img" />}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

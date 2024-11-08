import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { langContext } from "../../context/langContext";
import { Link as ScrollLink } from "react-scroll";
import Loading from "../Parts/Loading";

const HomeURL = process.env.REACT_APP_MongoDB_Home_URL;

export default function Inicio() {
  const [home, setHome] = useState([]);
  const { locale } = useContext(langContext);

  //Get home information
  useEffect(() => {
    const fetchHome = async () => {
      try {
        const response = await axios.get(HomeURL);
        if (response.status === 200) {
          setHome(response.data);
        } else {
          throw new Error("Error fetching home");
        }
      } catch (err) {
        throw new Error("No se pudo obtener la información de la empresa.");
      }
    };
    fetchHome();
  }, []);


  return (
    <section id="GeneraHome">
      <div className="genera-info">
        <div className="top-container"> </div>
        <Loading data={home} messageLoading ="loading.information" />
        <div className="genera-home">
          {home.map((info, index) => (
            <div key={index}>
              {info.HomeImg && (
                <img src={info.HomeImg} alt="Genera Technology" />
              )}
              <p id="genera-home-title">{info.HomeTitle}</p>
              <p>
                {locale === "es-MX"
                  ? info.HomeDescription_ES
                  : info.HomeDescription_EN}
              </p>
            </div>
          ))}
        </div>
        <div className="bottom-container">
          <ScrollLink to="GeneraContact" smooth={true} duration={500}>
            <button className="sendMessage">
              <FormattedMessage
                id="message.button"
                defaultMessage="Send a message"
              />
            </button>
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}

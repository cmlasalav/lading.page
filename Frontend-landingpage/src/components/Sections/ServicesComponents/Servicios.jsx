import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { FormattedMessage } from "react-intl";
import { langContext } from "../../../context/langContext";
import AddNew from "../../Parts/AddNew";
import Loading from "../../Parts/Loading";
import NewServices from "./NewServices";
const ServicesURL = process.env.REACT_APP_MongoDB_Services_URL;

export default function Services({
  setModalMessage,
  setErrorModal,
  setConfirm,
}) {
  const [services, setServices] = useState([]);
  const [newService, setNewService] = useState(false);
  const { locale } = useContext(langContext);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        //Get Services
        const response = await axios.get(ServicesURL);
        if (response.status === 200) {
          setServices(response.data);
        } else {
          setModalMessage("modal.general.error");
          setErrorModal(true);
        }
      } catch (error) {
        setModalMessage("modal.general.error");
        setErrorModal(true);
      }
    };

    fetchServices();
  }, []);

//Handle New Service form
  const handleNewService = (e) => {
    setNewService(true);
  };

  const handleNewServicesCancel = (e) => {
    setNewService(false);
  };

  return (
    <section id="GeneraServices">
      <h1>
        {" "}
        <span className="first-word">
          <FormattedMessage id="section.services.title1" defaultMessage="Our" />{" "}
        </span>
        <span className="second-word">
          <FormattedMessage
            id="section.services.title2"
            defaultMessage="Services"
          />
        </span>
      </h1>
      <Loading data={services} messageLoading="loading.services" />
      <div className="card-container">
        {!newService && (
          //New Service button
          <AddNew
            onNewService={handleNewService}
            viewType="service"
            lang="service.add.new"
            setModalMessage={setModalMessage}
            setErrorModal={setErrorModal}
          />
        )}
        {newService && (
          //Form new service
          <NewServices
            onCancel={handleNewServicesCancel}
            setModalMessage={setModalMessage}
            setErrorModal={setErrorModal}
            setConfirm={setConfirm}
          />
        )}
        {/*Services card*/}
        {services.map((service, index) => (
          <div key={index} className="card">
            <div className="image-card">
              {service.ServiceImage && (
                <img src={service.ServiceImage} alt="Service IMG" />
              )}
            </div>
            <div className="text-cards">
              <p className="title-card">
                {locale === "es-MX"
                  ? service.ServicesName_ES
                  : service.ServicesName_EN}
              </p>
              <p className="description-card">
                {locale === "es-MX"
                  ? service.ServiceDescription_ES
                  : service.ServiceDescription_EN}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

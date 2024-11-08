import { useContext } from "react";
import { langContext } from "../../../context/langContext";
import ES from "../../../assets/spain.png";
import EN from "../../../assets/united-kingdom.png";

export default function LangHeader() {
  const language = useContext(langContext);

  return (
    <div className="language-flags">
      <li>
        <button
          className="es-lan-flag"
          onClick={() => language.Pagelanguage("es-MX")}
        >
          <img src={ES} alt="Español"></img>
        </button>
      </li>
      <li>
        <button
          className="en-lan-flag"
          onClick={() => language.Pagelanguage("en-US")}
        >
          <img src={EN} alt="English"></img>
        </button>
      </li>
    </div>
  );
}

import Direction from "../Parts/Direction";
import FooterImg from "../../assets/Logo - Footer (2).jpg";

export default function Footer() {
  return (
    <footer className="footer-container">
      <img src={FooterImg} alt="Genera Technology"></img>
      <div className="footer-container-rigt">
        <Direction />
        <p>Trademak TM</p>
      </div>
    </footer>
  );
}

import Direction from "../../Parts/Direction";
import DirectionImage from "../../../assets/genera-location.png";

const DirectionURL = "https://www.google.com/maps/dir//Centro+Comercial+Terrazas+Lindora+diagonal+a+Forum+Radial+Sta.+Ana+-+San+Rafael+-+Bel%C3%A9n+2+Lindora+San+Jos%C3%A9,+Pozos/@9.9254272,-84.180992,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8fa0f944af747281:0xa8f497d2d2ac5a3e!2m2!1d-84.1966609!2d9.9572529?entry=ttu"

export default function ConnectDirection() {
  //Direction card
  return (
    <div className="rigt-column">
      <div className="genera-direction">
        <Direction />
        <a href={DirectionURL}>
          <img src={DirectionImage} alt="Direction"></img>
        </a>
      </div>
    </div>
  );
}

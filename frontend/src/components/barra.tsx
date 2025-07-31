import iconHome from "../assets/iconHome.svg";
import iconAdd from "../assets/iconAdd.svg";
import iconMessage from "../assets/iconMessage.svg";
import iconNotification from "../assets/iconNotification.svg";
import { useNavigate } from "react-router-dom";

export default function Barra() {
  const navigate = useNavigate();

  return (
    <div className="fixed flex justify-between w-full bottom-0 bg-white h-15 py-3 px-4">
      <img src={iconHome} onClick={() => navigate("/")} />
      <img src={iconAdd} />
      <img src={iconMessage} onClick={() => navigate("/chat")} />
      <img src={iconNotification} />
    </div>
  );
}

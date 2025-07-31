import perfil from "../assets/perfil.png";
import logo from "../assets/logo.svg";
import lupa from "../assets/lupa.svg";

export default function Header() {
  return (
    <div className="fixed flex justify-between items-center w-full top-0 bg-white h-[60px] py-2 px-2">
      <img src={perfil} height={40} width={40} className="rounded-3xl" />
      <img src={logo} height={50} width={50} />
      <img src={lupa} height={28} width={28} />
    </div>
  );
}

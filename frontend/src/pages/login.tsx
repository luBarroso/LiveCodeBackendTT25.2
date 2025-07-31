import { useState } from "react";
import Logo from "../assets/logo.svg";
import { useAuthContext } from "../contexts/AuthContext";
import Input from "../components/input";
import { Button } from "../components/button";

type User = {
  email: string;
  password: string;
};

export default function Login() {
  const [input, setInput] = useState<User>({
    email: "fulano@gmail.com",
    password: "#123456A",
  });
  const { handleLogin } = useAuthContext();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center p-10 gap-2 h-full w-full bg-[#FFFFFF]">
      <div className=" flex flex-col items-center h-40 gap-5">
        <img
          className="w-25 bg-[#EEEEEE] rounded-full p-2"
          src={Logo}
          alt="logo"
        />
        <h1 className="font-roboto font-normal text-4xl leading-[100%] tracking-[0%]">
          Zoetrope
        </h1>
      </div>
      <form
        className="flex flex-col gap-5 w-full"
        onSubmit={(event) => {
          event.preventDefault();
          handleLogin(input.email, input.password);
        }}
      >
        <Input
          label="Email"
          type="email"
          id="email"
          name="email"
          value={input.email}
          onChange={handleInput}
        />
        <Input
          label="Password"
          type="password"
          id="password"
          name="password"
          value={input.password}
          onChange={handleInput}
        />
        <Button value="Entrar" />
      </form>
    </div>
  );
}

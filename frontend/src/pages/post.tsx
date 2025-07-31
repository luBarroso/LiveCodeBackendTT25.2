import Barra from "../components/barra";
import Header from "../components/header";
import { useState } from "react";
import { postPost } from "../services/api";
import { useAuthContext } from "../contexts/AuthContext";
import Input from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

type Post = {
  tittle: string;
  content: string;
  status: "PRIVATE" | "PUBLIC";
};

export default function Post() {
  const [input, setInput] = useState<Post>({
    tittle: "",
    content: "",
    status: "PUBLIC",
  });
  const [image, setImage] = useState<File | null>(null);
  const { token } = useAuthContext();

  const navigate = useNavigate();

  const handlePost = async () => {
    if (!input) return;

    const formData = new FormData();
    if (image) formData.append("image", image);
    Object.entries(input).forEach(([key, value]) => {
      formData.append(key, value);
    });

    await postPost(formData, token);
  };

  const handleInput = (e: React.ChangeEvent<any>) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImage = (e: React.ChangeEvent<any>) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  return (
    <div className="h-full w-full">
      <Header />
      <div className="h-full bg-white mx-4 my-4">
        <form
          className="flex flex-col items-center my-2 mx-4 gap-4 pt-[60px] pb-15"
          onSubmit={(event) => {
            event.preventDefault();
            handlePost();
          }}
        >
          <Input
            label="Título"
            type="text"
            id="tittle"
            name="tittle"
            value={input.tittle}
            onChange={handleInput}
          />
          <Input
            label="Conteúdo"
            type="text"
            id="content"
            name="content"
            value={input.content}
            onChange={handleInput}
          />
          <div className="w-full flex flex-row gap-4">
            <label className="font-roboto font-normal text-[20px] leading-[28px] tracking-[0]">
              Status
            </label>
            <select
              className="flex-1 border border-black rounded-[8px] font-roboto font-normal text-[15px]"
              name="status"
              onChange={(e) => handleInput(e)}
            >
              <option value="PUBLIC">Public</option>
              <option value="PRIVATE">Private</option>
            </select>
          </div>
          <input
            className="w-full p-2 border border-black rounded-[8px] font-roboto font-normal text-[15px]"
            type="file"
            id="image"
            name="image"
            onChange={(e) => handleImage(e)}
          />
          <Button onClick={() => navigate("/")} value="Enviar" />
        </form>
      </div>
      <Barra />
    </div>
  );
}

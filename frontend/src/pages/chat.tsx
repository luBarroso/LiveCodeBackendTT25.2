import Barra from "../components/barra";
import Header from "../components/header";
import lupa from "../assets/lupa.svg";
import Card from "../components/card";
import { getPosts } from "../services/api";
import { useState } from "react";
import React from "react";

type Post = {
  tittle: string;
  content: string;
  senderEmail: string;
  createAt: string;
  imageUrl: string;
};

export default function Chat() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  const fetchPosts = async () => {
    const reposnse = await getPosts();
    const data = reposnse.data;
    setPosts(data);
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="h-full w-full">
      <Header />
      <div className="flex flex-col items-center my-2 mx-4 gap-2">
        <div className="flex justify-between items-center w-full border-secundary border-[1px] rounded-[5px] h-[46px] p-2">
          <input
            className="flex-1 focus: outline-none focus:border-none"
            placeholder="Buscar Conversas"
          ></input>
          <button>
            <img src={lupa} height={17} width={17} />
          </button>
        </div>
        <div className="flex flex-col items-center gap-2 w-full overflow-scroll">
          {posts?.map((post, index) => (
            <Card
              key={index}
              imagem={post.imageUrl}
              titulo={post.tittle}
              texto={post.content}
              senderEmail={post.senderEmail}
              data={post.createAt}
            />
          ))}
        </div>
        <Barra />
      </div>
    </div>
  );
}

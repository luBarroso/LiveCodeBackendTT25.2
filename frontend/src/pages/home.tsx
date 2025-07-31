import Barra from "../components/barra";
import Header from "../components/header";
import { getPosts } from "../services/api";
import { useState } from "react";
import React from "react";
import { Post } from "../components/post";
import { useNavigate } from "react-router-dom";

type PostProps = {
  tittle: string;
  content: string;
  senderEmail: string;
  createAt: string;
  imageUrl: string;
};

export default function Home() {
  const [posts, setPosts] = useState<PostProps[] | null>(null);

  const navigate = useNavigate();

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
      <div className="flex flex-col items-center my-2 mx-4 gap-2 pt-[60px] pb-15">
        {posts?.map((post, index) => (
          <Post
            key={index}
            imagem={post.imageUrl}
            titulo={post.tittle}
            texto={post.content}
            senderEmail={post.senderEmail}
            data={post.createAt}
          />
        ))}
      </div>
      <div
        className="text-3xl text-white flex items-center justify-center fixed rounded-full bg-[#007C82] w-12 h-12 bottom-20 right-5"
        onClick={() => navigate("/postar")}
      >
        +
      </div>
      <Barra />
    </div>
  );
}

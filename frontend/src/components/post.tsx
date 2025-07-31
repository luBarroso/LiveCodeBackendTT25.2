type PostProps = {
  imagem: string;
  texto: string;
  titulo: string;
  data: string;
  senderEmail: string;
};

export const Post = (props: PostProps) => {
  return (
    <div className="flex-1 flex-col justify-between w-full bg-white py-2 px-2">
      <p className="font-roboto text-[18px]">{props.senderEmail}</p>
      <p className="font-roboto text-[18px]">{props.titulo}</p>
      <p className="font-roboto text-[12px] text-gray-400">{props.texto}</p>
      <img
        src={"http://localhost:3333" + props.imagem}
        className="w-full aspect-auto"
      />
      <p className="place-self-center font-roboto text-[9.6px] text-gray-400">
        {props.data}
      </p>
    </div>
  );
};

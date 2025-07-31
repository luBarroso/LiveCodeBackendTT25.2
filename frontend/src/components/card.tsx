type CardProps = {
  imagem: string;
  texto: string;
  titulo: string;
  data: string;
  senderEmail: string;
};

export default function Card(props: CardProps) {
  return (
    <div className="flex justify-between w-full bg-white h-20 py-2 px-2">
      <img
        src={"http://localhost:3333" + props.imagem}
        height={62}
        width={62}
        className="rounded-full pr-1"
      />
      <div className="flex flex-col justify-between">
        <p className="font-roboto text-[18px]">{props.senderEmail}</p>
        <p className="font-roboto text-[18px]">{props.titulo}</p>
        <p className="font-roboto text-[12px] text-gray-400">{props.texto}</p>
      </div>
      <div className="flex flex-col justify-between items-center">
        <p className="font-roboto text-[9.6px] text-gray-400">{props.data}</p>
      </div>
    </div>
  );
}

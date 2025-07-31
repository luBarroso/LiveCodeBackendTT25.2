type InputProps = {
  label: string;
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input(props: InputProps) {
  return (
    <div className="w-full flex flex-col">
      <label className="font-roboto font-normal text-[20px] leading-[28px] tracking-[0]">
        {props.label}
      </label>
      <input
        className="w-full px-2 py-4 border border-black rounded-2xl"
        type={props.type}
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
}

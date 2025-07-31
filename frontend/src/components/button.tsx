import type { MouseEventHandler } from "react";

type ButtonProps = {
  value: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const Button = (prpos: ButtonProps) => {
  return (
    <button
      onClick={prpos.onClick}
      className="w-full rounded-2xl p-2 bg-[#007C82] text-white font-roboto font-normal text-2xl"
    >
      {prpos.value}
    </button>
  );
};

import Image, { StaticImageData } from "next/image";

const IconTextButton: React.FC<{
  onClick?: () => void;
  src: string;
  alt: string;
  label?: string;
  className?: string;
  BtnClass?: string;
  disabled?: boolean;
}> = ({ onClick, src, alt, label, className, BtnClass, disabled }) => (
  <button
    onClick={onClick}
    className={`flex items-center border-y-0 border-l-0 bg-none hover:bg-none hover:border-none px-0 pr-3 pl-1 md:pr-2 md:pl-1.5 ${BtnClass ? BtnClass : 'border-r-0'} ${
      disabled ? "opacity-50" : ""
    }`}
    disabled={disabled}
  >
    <Image
      src={src}
      alt={alt}
      width={30}
      height={30}
      className={`${className} ${
        alt === "Forward Button" || disabled ? "grayscale" : ""
      } ${label ? "mr-2" : ""}`}
    />
    <label className="text-xs">{label}</label>
  </button>
);

export default IconTextButton;

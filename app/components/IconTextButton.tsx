import Image, { StaticImageData } from "next/image";

const IconTextButton: React.FC<{
  onClick?: () => void;
  src: string;
  alt: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}> = ({ onClick, src, alt, label, className, disabled }) => (
  <button
    onClick={onClick}
    className={`flex items-center border-none bg-none hover:bg-none hover:border-none px-0 pr-3 pl-1`}
    disabled={disabled}
  >
    <Image
      src={src}
      alt={alt}
      width={30}
      height={30}
      className={`${className} ${((alt === "Forward Button") || (disabled))  ? "grayscale" : ""} ${
        label ? "mr-2" : ""
      }`}
    />
    <label className="text-xs">{label}</label>
  </button>
);

export default IconTextButton;

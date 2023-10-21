import Image, { StaticImageData } from "next/image";

const IconTextButton: React.FC<{
  onClick?: () => void;
  src: StaticImageData;
  alt: string;
  label?: string;
  className?: string;
  disabled?: boolean;
}> = ({ onClick, src, alt, label, className, disabled }) => (
  <button
    onClick={onClick}
    className={`flex items-center border-none bg-none hover:bg-none hover:border-none ${className}`}
    disabled={disabled}
  >
    <Image src={src} alt={alt} width={30} className="mx-2" />
    {label}
  </button>
);


export default IconTextButton;
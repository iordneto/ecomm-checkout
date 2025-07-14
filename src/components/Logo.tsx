import logoImage from "@/images/logos/logo.webp";
import Image from "./Image";

const Logo = () => (
  <div className="w-[116px] aspect-[116/25]">
    <Image
      src={logoImage}
      alt="Logo da empresa"
      width={0}
      height={0}
      style={{ width: "100%", height: "auto" }}
      priority
    />
  </div>
);

export default Logo;

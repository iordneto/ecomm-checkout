import Image from "@/components/Image";
import SecurityBadge from "@/images/checkout/security-badge.webp";

const VerificationBadge = () => (
  <div className="flex justify-between items-center gap-3 px-3 py-1.5 max-w-[190px] shadow-elevation rounded-xl bg-primary-100 line-height-1">
    <div className="w-[36px] aspect-[36/36]">
      <Image src={SecurityBadge} alt="Verification Badge" />
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-bold">COMPRA SEGURA</span>
      <span className="text-[10px] text-muted-foreground">100% GARANTIDO</span>
    </div>
  </div>
);

export default VerificationBadge;

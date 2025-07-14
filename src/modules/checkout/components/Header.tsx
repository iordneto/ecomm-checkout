import Container from "@/components/Container";
import Logo from "@/components/Logo";
import VerificationBadge from "../../../components/VerificationBadge";

const Header = () => {
  return (
    <div className="shadow-elevation rounded-b-sm">
      <Container>
        <div className="flex justify-between items-center py-6">
          <Logo />
          <VerificationBadge />
        </div>
      </Container>
    </div>
  );
};

export default Header;

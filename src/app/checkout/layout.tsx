// app/checkout/layout.tsx
import { Breadcrumb } from "@/components/Breadcrumb";
import Container from "@/components/Container";
import type { ReactNode } from "react";
import Header from "../../modules/checkout/components/Header";

const CheckoutLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col gap-4">
      <Header />
      <main>
        <Container>
          <div className="flex flex-col gap-4">
            <Breadcrumb
              breadcrumbs={[
                { label: "Delivery", href: "/checkout" },
                { label: "Payment", href: "/checkout/payment" },
              ]}
            />
            {children}
          </div>
        </Container>
      </main>
    </div>
  );
};

export default CheckoutLayout;

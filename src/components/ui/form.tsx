"use client";

import { PropsWithChildren } from "react";

type FormSectionProps = PropsWithChildren & {
  title: string;
};

const Section = ({ title, children }: FormSectionProps) => {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg w-full">
      <h2 className="text-lg font-medium text-center">{title}</h2>
      {children}
    </div>
  );
};

const Footer = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col items-end">{children}</div>;
};

const Form = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col items-end gap-2.5">{children}</div>;
};

Form.Section = Section;
Form.Footer = Footer;

export default Form;

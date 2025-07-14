"use client";

import { PropsWithChildren } from "react";

type FormSectionProps = PropsWithChildren & {
  title: string;
};

const FormSection = ({ title, children }: FormSectionProps) => {
  return (
    <div className="flex flex-col gap-3 border p-4 rounded-lg">
      <h2 className="text-lg font-medium text-center">{title}</h2>
      {children}
    </div>
  );
};

const Form = ({ children }: PropsWithChildren) => {
  return <div className="flex flex-col gap-2.5">{children}</div>;
};

Form.Section = FormSection;

export default Form;

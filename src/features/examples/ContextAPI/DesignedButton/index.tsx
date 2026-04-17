import React, { useContext } from "react";
import { DesignStyleContext } from "../contexts/designStyleContext";

export interface ButtonProps {
  children: React.ReactNode;
}

const DesignedButton = ({
  children,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const designStyle = useContext(DesignStyleContext);
  return (
    <button className={["button", designStyle].join(" ")} {...rest}>
      {children} {designStyle}
    </button>
  );
};

export default DesignedButton;

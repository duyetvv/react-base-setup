import React from "react";

import "./styles.scss";

export type BVariants = "primary" | "secondary" | "success" | "warning";
export type BSizes = "sm" | "md" | "lg";
export type BTypes = "button" | "submit";

export interface ButtonProps {
  children: React.ReactNode;
  variant?: BVariants;
  size?: BSizes;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({ children = "", variant = "primary", size = "md", ...rest }) => {
  return (
    <button className={["button", variant, size].join(" ")} {...rest}>
      {children}
    </button>
  );
};

export default Button;

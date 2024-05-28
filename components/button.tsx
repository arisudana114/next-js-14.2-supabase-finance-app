import { sizes, variants } from "@/lib/variants";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps {
  variant?: string;
  size?: string;
}

export default function Button(
  props: ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
) {
  return (
    <button
      {...props}
      className={`${
        props.variant
          ? variants[props.variant as keyof typeof variants]
          : variants["default"]
      } ${
        props.size ? sizes[props.size as keyof typeof sizes] : sizes["base"]
      } ${props.className}`}
    ></button>
  );
}

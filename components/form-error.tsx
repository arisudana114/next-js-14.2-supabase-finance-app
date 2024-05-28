import React from "react";

interface FormErrorProps {
  error: any;
}

export default function FormError({ error }: FormErrorProps) {
  return error && <p className="mt-1 text-red-500">{error}</p>;
}

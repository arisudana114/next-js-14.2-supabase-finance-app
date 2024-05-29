import { useMemo } from "react";

export const useFormatCurrency = (amount: number) => {
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);

  return useMemo(() => formatCurrency(amount), [amount]);
};

import React, { SelectHTMLAttributes, forwardRef } from "react";

export default forwardRef(function Select(
  props: SelectHTMLAttributes<HTMLSelectElement>, ref: React.Ref<HTMLSelectElement>
) {
  return (
    <select ref={ref}
      {...props}
      className="w-full rounded-md shadow-sm border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-950"
    ></select>
  );
});
import React from "react";
import Alert from "./alert";
import { Check } from "lucide-react";

interface AlertSuccessProps {
  children: any;
}

export default function AlertSuccess({ children }: AlertSuccessProps) {
  return (
    <Alert
      icon={<Check className="text-green-700 dark:text-green-300 w-6 h-6" />}
      title={
        <span className="text-green-700 dark:text-green-300">Success</span>
      }
    >
      <span className="text-green-700 dark:text-green-300">{children}</span>
    </Alert>
  );
}

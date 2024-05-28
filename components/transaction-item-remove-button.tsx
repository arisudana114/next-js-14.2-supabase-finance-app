'use client'

import React, { useState } from "react";
import Button from "./button";
import { deleteTransaction } from "@/lib/actions";
import { Loader, X } from "lucide-react";

export default function TransactionItemRemoveButton({ id, onRemoved }: any) {
  const [loading, setLoading] = useState<boolean | undefined>(undefined);
  const [confirmed, setConfirmed] = useState<boolean | undefined>(undefined);

  const handleClick = async () => {
    if (!confirmed) {
      setConfirmed(true);
      return;
    }
    try {
      setLoading(true);
      await deleteTransaction(id);

      onRemoved();
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button
      size="xs"
      variant={!confirmed ? "ghost" : "danger"}
      onClick={handleClick}
      aria-disabled={loading}
    >
      {!loading && <X className="w-4 h-4" />}
      {loading && <Loader className="w-4 h4 animate-spin" />}
    </Button>
  );
}

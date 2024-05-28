"use client";

import Button from "@/components/button";
import Separator from "@/components/separator";
import TransactionItem from "@/components/transaction-item";
import TransactionSummaryItem from "@/components/transaction-summary-item";
import { fetchTransactions } from "@/lib/actions";
import { Transaction, groupAndSumTransationsByDate } from "@/lib/utils";
import { Loader } from "lucide-react";
import React, { useState } from "react";

export default function TransactionList({ range, initialTransactions }: any) {
  const [transactions, setTransactions] = useState(initialTransactions);

  const [buttonHidden, setButtonHidden] = useState(
    initialTransactions.length === 0
  );
  const [loading, setLoading] = useState(false);
  const grouped = groupAndSumTransationsByDate(transactions);

  const handleClick = async () => {
    setLoading(true);
    let nextTransactions: any = null;
    try {
      nextTransactions = await fetchTransactions(
        range,
        transactions.length,
        10
      );
      setButtonHidden(nextTransactions.length === 0);

      setTransactions((prevTransactions: any) => [
        ...prevTransactions,
        ...nextTransactions,
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoved = (id: string) => () => {
    setTransactions((prev: any) => [...prev].filter((t) => t.id !== id));
  };

  return (
    <div className="space-y-8">
      {Object.entries(grouped).map(([date, { transactions, amount }]) => (
        <div key={date}>
          <TransactionSummaryItem date={date} amount={amount} />
          <Separator />
          <section className="space-y-4">
            {transactions.map((transaction: Transaction) => (
              <div key={transaction.id}>
                <TransactionItem
                  {...transaction}
                  onRemoved={handleRemoved(transaction.id)}
                />
              </div>
            ))}
          </section>
        </div>
      ))}
      {transactions.length === 0 && (
        <div className="text-center text-gray-400 dark:text-gray-500">
          No transactions found
        </div>
      )}
      {!buttonHidden && (
        <div className="flex justify-center">
          <Button variant="ghost" onClick={handleClick} disabled={loading}>
            <div className="flex items-center space-x-1">
              {loading && <Loader className="animate-spin" />}
              <div>Load More</div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}

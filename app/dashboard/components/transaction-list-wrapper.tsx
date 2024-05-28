import { fetchTransactions } from "@/lib/actions";
import React from "react";
import TransactionList from "./transaction-list";

export default async function TransactionListWrapper({ range }: any) {
  const transactions = await fetchTransactions(range);
  return <TransactionList initialTransactions={transactions} key={range} range={range}/>;
}

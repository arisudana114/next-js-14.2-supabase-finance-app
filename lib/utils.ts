export interface Transaction {
    id: string;
    type: string;
    amount: number;
    description: string;
    category: string;
    created_at: string;
  }

export const groupAndSumTransationsByDate = (transactions: Transaction[]) => {
    const grouped: Record<string, any> = {};
    for (const transaction of transactions) {
      const date = transaction.created_at.split("T")[0];
      if (!grouped[date]) {
        grouped[date] = { transactions: [], amount: 0 };
      }
      grouped[date].transactions.push(transaction);
      const amount =
        transaction.type === "Expense" ? -transaction.amount : transaction.amount;
      grouped[date].amount += amount;
    }
  
    return grouped;
  };
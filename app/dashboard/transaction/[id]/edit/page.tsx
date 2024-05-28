import TransactionForm from "@/app/dashboard/components/transaction-form";
import { createClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    id: string;
  };
}

export const metadata: Metadata = {
  title: "Edit Transaction",
};

const Page: React.FC<PageProps> = async ({ params: { id } }) => {
  const supabase = createClient();
  const { data: transaction, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) notFound();
  return (
    <>
      <h1 className="text-4xl font-semibold mb-8">Edit Transaction</h1>
      <TransactionForm initialData={transaction} />
    </>
  );
};

export default Page;

import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="p-4">
        <h1 className="text-4xl font-bold flex flex-col gap-4">Welcome to Finance App!</h1>
        <Button>
          <Link href="/dashboard">Go to Finance Dashboard</Link>
        </Button>
      </div>
    </>
  );
}

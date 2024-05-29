import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="text-4xl">Welcome to Finance App!</h1>
        <Button>
          <Link href="/dashboard">Go to Finance Dashboard</Link>
        </Button>
      </div>
    </>
  );
}

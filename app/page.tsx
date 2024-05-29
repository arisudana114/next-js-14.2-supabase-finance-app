import Button from "@/components/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>
        <Button>
          <Link href="/dashboard"></Link>
        </Button>
      </div>
    </>
  );
}

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>Hello ai-chat-formfill</div>
      <Button className="bg-red-500">Hello </Button>
      <Link
        href="/profile"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Profile
      </Link>
    </main>
  );
}

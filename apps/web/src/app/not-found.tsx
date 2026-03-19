import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-2xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-2 text-deep-umber">The page you’re looking for doesn’t exist.</p>
      <Button asChild className="mt-6">
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}

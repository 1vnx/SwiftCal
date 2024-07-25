import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full px-12 py-8 flex justify-between select-none">
      <div className="text-xl">
        <Link href="/">SwiftCal.</Link>
      </div>
      <div className="flex gap-6 items-center">
        <UserButton />
      </div>
    </header>
  );
}

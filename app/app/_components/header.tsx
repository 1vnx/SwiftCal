import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <div className="w-full px-8 py-6 flex justify-between">
      <div className="text-xl select-none">SwiftCal.</div>
      <div className="flex gap-6 items-center">
        <UserButton />
      </div>
    </div>
  );
}

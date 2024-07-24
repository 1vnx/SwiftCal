import Link from "next/link";
import { Github } from "lucide-react";

import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

export default function Header() {
  return (
    <header className="w-full px-12 py-8 flex justify-between">
      <div className="text-xl">
        <Link href="/">SwiftCal.</Link>
      </div>
      <div>
        <Link href="https://github.com/1vnx/swiftcal" target="_blank">
          <AnimatedShinyText className="inline-flex items-center justify-center transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400" shimmerWidth={50}>
          <span className="flex gap-2 items-center"><Github className="h-4 w-4" />Github</span>
        </AnimatedShinyText>
      </Link></div>
    </header>
  );
}

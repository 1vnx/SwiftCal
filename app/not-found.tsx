"use client";

import Header from "./_components/header";
import { Spotlight } from "@/components/ui/spotlight";

import Particles from "@/components/magicui/particles";

import Link from "next/link";

import { Button } from "@/components/ui/moving-border";

export default function Home() {
  return (
    <div>
      <Header />
      <div className="w-full px-8 lg:px-12 pt-12 flex flex-col justify-between items-center text-center">
        <Spotlight
          className="-top-40 left-0 md:left-60 md:-top-20"
          fill="white"
        />
        <Particles
          className="absolute inset-0 -z-[2]"
          quantity={100}
          ease={80}
          color="#ffffff"
          refresh
        />
        <h1 className="text-5xl w-[95%] lg:text-6xl lg:w-[60%] lg:leading-tight bg-gradient-to-br dark:from-white from-30% dark:to-white/40 bg-clip-text text-transparent font-medium tracking-tighter text-balance">
          404
        </h1>
        <p className="lg:w-[50%] mt-4 leading-relaxed text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <div className="mt-6">
          <Link href="/app">
            <Button variant={"outline"} duration={3000}>
              Visit Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

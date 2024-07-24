"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { BorderBeam } from "@/components/magicui/border-beam";
import { Spotlight } from "@/components/ui/spotlight";

import Image from "next/image";

import Particles from "@/components/magicui/particles";

import Link from "next/link";

import { Button } from "@/components/ui/moving-border";

export default function Hero() {
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");

  useEffect(() => {
    setColor(theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);
  
  return (
    <div className="w-full px-12 pt-12 flex flex-col justify-center items-center text-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Particles
        className="absolute inset-0 -z-[2]"
        quantity={100}
        ease={80}
        color={color}
        refresh
      />
      <h1 className="text-4xl w-[95%] lg:text-5xl lg:w-[60%] lg:leading-tight bg-gradient-to-br dark:from-white from-black from-30% dark:to-white/40 to-black/40 bg-clip-text text-transparent font-medium tracking-tighter text-balance">
        Your Hassle-Free Solution for Managing Appointments
      </h1>
      <p className="lg:w-[50%] mt-4 leading-relaxed text-muted-foreground">
        Book and manage your appointments effortlessly with our user-friendly
        platform. Experience seamless scheduling and stay organized with just a
        few clicks.
      </p>
      <div className="mt-6">
        <Link href="/app">
          <Button variant={"outline"} duration={3000}>
            Get Started For Free
          </Button>
        </Link>
      </div>
      <div className="relative mt-[6rem] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_30%,transparent)] flex h-fit flex-col items-center justify-center overflow-hidden rounded-lg md:shadow-xl w-[80%]">
        <BorderBeam size={100} duration={10} className="z-50" />
        <Image
          src="/langfuse.png"
          width={1900}
          height={1080}
          alt="Hero Image"
          className="hidden relative w-full h-full rounded-[inherit] border object-contain dark:block"
        />
      </div>
      {/* <div className="absolute inset-0 -z-10 bg-none h-full w-full  [background:radial-gradient(150%_150%_at_50%_10%,#ffffff00_50%,#B65CFF_100%)]"></div> */}
    </div>
  );
}

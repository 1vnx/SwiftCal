"use client";

import Header from "./_components/header";
import Hero from "./_components/hero";
import Features from "./_components/features";

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <Header />
      <Hero />
      <Features />
    </div>
  );
}

"use client";

import React from 'react';
import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScrolling({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactLenis root options={{ lerp: 0.06 }}>
      {children}
    </ReactLenis>
  );
}
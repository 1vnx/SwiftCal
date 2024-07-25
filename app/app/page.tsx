"use client";

import { getWorkspaces } from "@/services/workspace";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { useEffect } from "react";

export default function App() {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      getWorkspaces(userId).then((data) => {
        if (data.length === 0) {
          router.push("/app/onboarding");
        } else {
          router.push(`/app/workspace/${data[0].path}`);
        }
      });
    }
  }, [userId]);

  return <div></div>;
}

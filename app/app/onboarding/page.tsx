"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Particles from "@/components/magicui/particles";

import { useState, useTransition } from "react";

import { onAddWorkspace } from "@/actions/workspace";

import { toast } from "sonner";

import { useRouter } from "next/navigation";

import { useAuth } from "@clerk/nextjs";

export default function Onboarding() {
  const { userId } = useAuth();

  const [name, setName] = useState("");
  const [path, setPath] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleAddWorkspace() {
    startTransition(() => {
      if (name && path && userId) {
        onAddWorkspace(name, path, userId)
          .then((data) => {
            toast.success("Workspace created successfully", {
              duration: 2000,
            });
            router.push(`/app/workspace/${data.path}`);
          })
          .catch((error) =>
            toast.error(error.message, {
              duration: 2000,
            })
          );
      }
    });
  }

  return (
    <div className="w-full px-8 lg:px-12 pt-6 flex flex-col justify-center items-center text-center">
      <Particles
        className="absolute inset-0 -z-[2]"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <h2 className="text-2xl">Create a New Workspace</h2>
      <p className="mt-2 leading-relaxed text-muted-foreground">
        Workspaces are shared environment to manage your events.
      </p>
      <div className="flex flex-col p-7 mt-6 space-y-6 items-center w-[450px] bg-[#111213] rounded-lg border border-input/30">
        <div className="w-full flex flex-col items-start space-y-3">
          <Label>Workspace Name</Label>
          <Input
            className="bg-transparent"
            disabled={isPending}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="w-full flex flex-col items-start space-y-3">
          <Label>Workspace URL</Label>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 select-none">
              app/
            </span>
            <Input
              className="pl-[46px] bg-transparent"
              disabled={isPending}
              onChange={(e) => setPath(e.target.value)}
            />
          </div>
        </div>

        <Button
          variant="outline"
          disabled={isPending}
          onClick={handleAddWorkspace}
        >
          Create Workspace
        </Button>
      </div>
    </div>
  );
}

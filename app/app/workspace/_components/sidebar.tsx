"use client";

import Link from "next/link";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { getWorkspaces } from "@/services/workspace";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { useEffect, useState } from "react";

import { Workspace } from "@prisma/client";

import { PlusIcon } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Sidebar() {
  const pathname = usePathname();
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    if (userId) {
      getWorkspaces(userId).then((data) => {
        if (data.length === 0) {
          router.push("/app/onboarding");
        } else {
          setLoading(false);
          setWorkspaces(data);
        }
      });
    }
  }, [userId]);

  return (
    <div className="hidden border-r md:block py-2 px-2 select-none">
      <div className="flex h-full max-h-screen flex-col">
        <div className="flex h-14 items-center justify-between lg:h-[60px] lg:px-6">
          <span>Your Workspaces</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Link href="/app/onboarding">
                  <PlusIcon className="h-4 w-4 text-muted-foreground" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create new</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex-1">
          <nav className="grid items-start text-sm font-medium space-y-4">
            {workspaces.map((workspace) => (
              <Link
                key={workspace.id}
                href={`/app/workspace/${workspace.path}`}
                className={cn(
                  "flex items-center px-4 pl-4 lg:pl-6 transition-all",
                  pathname === `/app/workspace/${workspace.path}`
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {workspace.name}
              </Link>
            ))}

            {loading &&
              [1, 2, 3].map((i) => (
                <div key={i} className="px-4 pl-4 lg:pl-6">
                  <Skeleton className="h-5 w-40 border-muted-foreground" />
                </div>
              ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

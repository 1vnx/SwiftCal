import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Particles from "@/components/magicui/particles";

export default function Onboarding() {
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
          <Input className="bg-transparent" placeholder="Work" />
        </div>

        <div className="w-full flex flex-col items-start space-y-3">
          <Label>Workspace URL</Label>
          <Input className="bg-transparent" placeholder="Work" />
        </div>

        <Button variant="outline">Create Workspace</Button>
      </div>
    </div>
  );
}

"use client";

import { getWorkspace } from "@/services/workspace";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { useEffect } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

interface WorkspaceProps {
  params: {
    path: string;
  };
}

const events = [{ title: "Meeting", start: new Date() }];

export default function Workspace({ params }: WorkspaceProps) {
  const { userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userId) {
      getWorkspace(params.path, userId).then((data) => {
        if (!data) {
          router.push("/404");
        } else {
        }
      });
    }
  }, [userId, params.path]);

  return (
    <div className="w-full px-8 lg:px-12 pt-8">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo: any) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}

"use client";

import { getWorkspace } from "@/services/workspace";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

import { useEffect, useState, useTransition } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { Skeleton } from "@/components/ui/skeleton";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";

import { onAddEvent, onEditEvent, onDeleteEvent } from "@/actions/workspace";

import { toast } from "sonner";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface WorkspaceProps {
  params: {
    path: string;
  };
}

import {
  type Workspace as PrismaWorkspace,
  type Event as PrismaEvent,
} from "@prisma/client";
import { cn } from "@/lib/utils";

import { HexColorPicker } from "react-colorful";

export type WorkspaceWithEvents = PrismaWorkspace & {
  events: PrismaEvent[];
};

export default function WorkspacePage({ params }: WorkspaceProps) {
  const { userId } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "e") {
        event.preventDefault(); // Prevent default behavior
        setOpen((prevOpen) => !prevOpen);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [workspace, setWorkspace] = useState<WorkspaceWithEvents>();

  // Dialog States
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("#0079bf");
  const [eventId, setEventId] = useState("");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [isPending, startTransition] = useTransition();
  const [editing, setEditing] = useState(false);

  const handleDateClick = (args: any) => {
    setStartDate(formatDate(args.date));
    setOpen(true);
  };

  function handleAddEvent() {
    startTransition(() => {
      if (title && startDate && color && workspace) {
        onAddEvent(title, startDate, endDate ?? null, workspace.id, color)
          .then((data) => {
            toast.success("Event Added successfully", {
              duration: 2000,
            });
            setOpen(false);
            setTitle("");
            setEventId("");
            setStartDate(undefined);
            setEndDate(undefined);
            setColor("#0079bf");
            if (workspace) {
              setWorkspace({
                ...workspace,
                events: [...workspace.events, data],
              });
            }
          })
          .catch((error) =>
            toast.error(error.message, {
              duration: 2000,
            })
          );
      }
    });
  }

  function handleEditEvent(eventId: string) {
    startTransition(() => {
      if (title && startDate && color && workspace) {
        onEditEvent(
          eventId,
          title,
          startDate,
          endDate ?? null,
          workspace.id,
          color
        )
          .then((data) => {
            toast.success("Event Edited successfully", {
              duration: 2000,
            });
            setOpen(false);
            setTitle("");
            setEventId("");
            setStartDate(undefined);
            setEndDate(undefined);
            setColor("#0079bf");
            if (workspace) {
              setWorkspace({
                ...workspace,
                events: workspace.events.map((event) =>
                  event.id === data.id ? data : event
                ),
              });
            }
            setEditing(false);
          })
          .catch((error) =>
            toast.error(error.message, {
              duration: 2000,
            })
          );
      }
    });
  }

  function handleDeleteEvent(eventId: string) {
    startTransition(() => {
      if (workspace) {
        onDeleteEvent(eventId)
          .then(() => {
            toast.success("Event Deleted successfully", {
              duration: 2000,
            });
            setOpen(false);
            setTitle("");
            setEventId("");
            setStartDate(undefined);
            setEndDate(undefined);
            setColor("#0079bf");
            if (workspace) {
              setWorkspace({
                ...workspace,
                events: workspace.events.filter(
                  (event) => event.id !== eventId
                ),
              });
            }
            setEditing(false);
          })
          .catch((error) =>
            toast.error(error.message, {
              duration: 2000,
            })
          );
      }
    });
  }

  useEffect(() => {
    if (userId) {
      getWorkspace(params.path, userId).then((data) => {
        if (!data) {
          router.push("/404");
        } else {
          setLoading(false);
          setWorkspace(data);
        }
      });
    }
  }, [userId, params.path]);

  const fullCalendarEvents = workspace?.events
    ? transformEvents(workspace.events)
    : [];

  const handleEventClick = (info: any) => {
    setTitle(info.event.title);
    setStartDate(info.event.start);
    setEndDate(info.event.end);
    setEventId(info.event.id);
    setColor(info.event.backgroundColor);
    setOpen(true);
    setEditing(true);
  };

  if (loading) {
    return (
      <div className="w-full px-8 lg:px-12 pt-8 select-none">
        <div className="flex justify-between">
          <Skeleton className="w-40 h-10" />
          <div className="flex space-x-2">
            <Skeleton className="w-20 h-10" />
            <Skeleton className="w-24 h-10" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-8 lg:px-12 pt-8 select-none">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        dateClick={handleDateClick}
        events={fullCalendarEvents}
        eventContent={renderEventContent}
        eventClick={handleEventClick}
        buttonText={{
          today: "Today",
        }}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Event" : "Add Event"}</DialogTitle>
            <DialogDescription>
              {editing ? "Edit your event." : "Add an event to your calendar."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Event Title
              </Label>
              <Input
                className="col-span-3"
                disabled={isPending}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Start Date</Label>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {startDate ? (
                      format(startDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    disabled={isPending}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">End Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {endDate ? (
                      format(endDate, "PPP")
                    ) : (
                      <span>Pick a date (Optional)</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    disabled={isPending}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Color
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <span>{color}</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <HexColorPicker color={color} onChange={setColor} />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            {editing ? (
              <>
                <Button
                  variant={"destructive"}
                  onClick={(e) => handleDeleteEvent(eventId)}
                  disabled={isPending}
                >
                  Delete
                </Button>
                <Button
                  type="submit"
                  disabled={isPending}
                  onClick={(e) => handleEditEvent(eventId)}
                >
                  Edit Event
                </Button>
              </>
            ) : (
              <Button
                type="submit"
                disabled={isPending}
                onClick={handleAddEvent}
              >
                Add Event
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

interface FullCalendarEvent {
  id: string;
  title: string;
  start: Date | string;
  end?: Date | string;
  color: string;
}

const transformEvent = (event: PrismaEvent): FullCalendarEvent => {
  return {
    id: event.id,
    title: event.title,
    start: event.start.toISOString(), // Convert DateTime to ISO string
    end: event.end?.toISOString(), // Convert DateTime to ISO string if it exists
    color: event.color,
  };
};

// Transform array of Prisma Events
const transformEvents = (events: PrismaEvent[]): FullCalendarEvent[] =>
  events.map(transformEvent);

function renderEventContent(eventInfo: any) {
  return (
    <>
      <span>{eventInfo.event.title}</span>
    </>
  );
}

const formatDate = (date: any) => {
  return date.toISOString();
};

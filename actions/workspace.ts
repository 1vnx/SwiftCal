"use server";

import {
  addWorkspace,
  addEvent,
  editEvent,
  deleteEvent,
} from "@/services/workspace";

export async function onAddWorkspace(
  name: string,
  path: string,
  userId: string
) {
  try {
    const event = await addWorkspace(name, path, userId);
    return event;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function onAddEvent(
  title: string,
  start: Date,
  end: Date | null,
  workspaceId: string,
  color: string
) {
  try {
    const event = await addEvent(title, start, end, workspaceId, color);
    return event;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function onEditEvent(
  eventId: string,
  title: string,
  start: Date,
  end: Date | null,
  workspaceId: string,
  color: string
) {
  try {
    const event = await editEvent(eventId, title, start, end, workspaceId, color);
    return event;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function onDeleteEvent(eventId: string) {
  try {
    await deleteEvent(eventId);
    return eventId;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

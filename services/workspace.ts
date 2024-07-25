"use server";

import { db } from "@/lib/db";

export async function addWorkspace(name: string, path: string, owner: string) {
  const existingWorkspace = await db.workspace.findUnique({
    where: {
      path,
    },
  });

  if (existingWorkspace) {
    throw new Error(`A workspace with the path "${path}" already exists.`);
  }

  const workspace = await db.workspace.create({
    data: {
      name,
      path,
      owner,
    },
  });

  return workspace;
}

export async function getWorkspace(path: string, owner: string) {
  return await db.workspace.findUnique({
    where: {
      path,
      owner,
    },
    include: {
      events: true,
    },
  });
}

export async function getWorkspaces(owner: string) {
  return await db.workspace.findMany({
    where: {
      owner,
    },
  });
}

export async function addEvent(
  title: string,
  start: Date,
  end: Date | null,
  workspaceId: string,
  color: string
) {
  const event = await db.event.create({
    data: {
      title,
      start,
      end,
      workspaceId,
      color,
    },
  });

  return event;
}

export async function editEvent(
  eventId: string,
  title: string,
  start: Date,
  end: Date | null,
  workspaceId: string,
  color: string
) {
  const event = await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      title,
      start,
      end,
      workspaceId,
      color,
    },
  });

  return event;
}

export async function deleteEvent(eventId: string) {
  const event = await db.event.delete({
    where: {
      id: eventId,
    },
  });
}

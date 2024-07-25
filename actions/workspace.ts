"use server";

import { addWorkspace, addEvent } from "@/services/workspace";

export async function onAddWorkspace(
  name: string,
  path: string,
  userId: string
) {
  try {
    const monitor = await addWorkspace(name, path, userId);
    return monitor;
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
  workspaceId: string
) {
  try {
    const monitor = await addEvent(title, start, end, workspaceId);
    return monitor;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
}

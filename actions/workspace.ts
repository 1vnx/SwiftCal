"use server";

import { addWorkspace } from "@/services/workspace";

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

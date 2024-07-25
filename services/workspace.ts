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
  });
}

export async function getWorkspaces(owner: string) {
  return await db.workspace.findMany({
    where: {
      owner,
    },
  });
}

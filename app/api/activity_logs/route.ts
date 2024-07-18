"use server";
import { activityLogsRef } from "@/lib/db";
import { get } from "firebase/database";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  let activityLogs = {} as { [key: string]: ActivityLog };
  try {
    activityLogs = await get(activityLogsRef).then((snapshot) => snapshot.val());
  } catch (error) {
    return NextResponse.json({ status: 500, body: error });
  }
  if (!activityLogs) return NextResponse.json({ status: 404, body: {} });
  return NextResponse.json({ status: 200, body: activityLogs });
};
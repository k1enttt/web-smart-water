"use server";
import dbConnect from "@/lib/dbConnect";
import Activity from "@/models/Activity";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const activities = await Activity.find({}).exec();
        if (!activities) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, data: activities });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
} 

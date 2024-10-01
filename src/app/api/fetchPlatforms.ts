// pages/api/fetchPlatforms.ts
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const response = await axios.get("https://2fa.directory/api/v3/all.json");
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch platform data" });
  }
}

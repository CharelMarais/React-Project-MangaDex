import * as functions from "firebase-functions";
import axios from "axios";
import cors from "cors";
import { Request, Response } from "express";
import { stringify } from "qs";

const corsHandler = cors({ origin: true });

export const mangaProxy = functions.https.onRequest((req: Request, res: Response) => {
  corsHandler(req, res, async () => {
    try {
      const baseUrl = "https://api.mangadex.org";
      const path = req.path.replace("/api/", "");

      // Merge default and user parameters
      const mergedParams = {
        ...req.query,
        ...(path === "manga" && {
          "includes[]": "cover_art",
        }),
      };

      // Properly format for MangaDex API
      const queryString = stringify(mergedParams, {
        arrayFormat: "brackets",
        encode: false,
        indices: false,
      });

      const apiUrl = `${baseUrl}/${path}?${queryString}`;

      console.log("Final MangaDex URL:", apiUrl);

      const response = await axios.get(apiUrl);
      res.status(response.status).json(response.data);
    } catch (error: any) {
      console.error("Full error details:", error.response?.data);
      res.status(400).json({
        error: "MangaDex API Error",
        message: error.response?.data?.errors?.[0]?.detail || "Invalid request",
        status: error.response?.status,
      });
    }
  });
});

export const imageProxy = functions.https.onRequest(async (req: Request, res: Response) => {
  return corsHandler(req, res, async () => { // Added return here
    try {
      const imageUrl = req.query.url;
      if (!imageUrl || typeof imageUrl !== "string") {
        return res.status(400).send("Missing image URL");
      }

      // Validate URL format
      if (!imageUrl.startsWith("https://uploads.mangadex.org/")) {
        return res.status(400).send("Invalid image source");
      }

      const response = await axios.get(imageUrl, {
        responseType: "stream",
        headers: {
          "User-Agent": "KameHouseManga/1.0 (+https://kame-house-manga.web.app)",
          "Accept": "image/*",
        },
      });

      // Set proper headers
      res.set({
        "Content-Type": response.headers["content-type"],
        "Cache-Control": "public, max-age=604800",
        "Access-Control-Allow-Origin": "*",
      });

      return response.data.pipe(res); // Added return here
    } catch (error) {
      console.error("Image proxy error:", error);
      return res.status(500).send("Failed to fetch image"); // Added return here
    }
  });
});

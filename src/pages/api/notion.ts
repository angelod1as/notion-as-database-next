import { Client } from "@notionhq/client";
import type { NextApiRequest, NextApiResponse } from "next";

type FormData = {
  "first-name": string;
  "last-name": string;
  "food-limitation": string;
  "plus-one": string;
  "money-gift": string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const data: FormData = JSON.parse(req.body);
  const databaseId = process.env.NOTION_PARTY_DB;
  const apiKey = process.env.NOTION_API_KEY;

  if (!databaseId || !apiKey) throw new Error("The secret keys are missing");

  if (req.method !== "POST") return;

  const notion = new Client({ auth: `${apiKey}` });

  const response = await notion.pages.create({
    parent: {
      database_id: `${databaseId}`,
    },
    properties: {
      "first-name": {
        title: [
          {
            type: "text",
            text: {
              content: data["first-name"] ?? "",
            },
          },
        ],
      },
      "last-name": {
        rich_text: [
          {
            type: "text",
            text: {
              content: data["last-name"] ?? "",
            },
          },
        ],
      },
      "food-limitation": {
        select: {
          name: data["food-limitation"],
        },
      },
      "plus-one": {
        checkbox: data["plus-one"] === "true",
      },
      "money-gift": {
        number: parseInt(data["money-gift"]),
      },
    },
  });

  if (response.id) return res.status(200);

  return res.status(500);
}

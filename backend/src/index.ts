import express, { Express, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3333;

const prisma = new PrismaClient();

prisma
  .$connect()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((e) => {
    console.error("Failed to connect to the database:", e);
    process.exit(1);
  });

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit();
});

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint untuk mendapatkan daftar kata arkais
app.get("/words", async (req: Request, res: Response) => {
  try {
    const kata = req.query.search ? req.query.search.toString() : "";
    const words = await prisma.words.findMany({
      where: {
        kata: { contains: kata },
      },
    });
    res.status(200).json(words);
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Jalankan server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

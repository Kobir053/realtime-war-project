import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";

dotenv.config();

const app = express();

const httpServer = createServer(app);

app.use(express.json());
app.use(cors());


const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
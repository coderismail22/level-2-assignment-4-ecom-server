import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:5000/api/"] }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Bike Rental Service Server !!!" });
});

app.use("/api/", router);

// Middleware
app.use(globalErrorHandler);
app.use(notFound);

export default app;

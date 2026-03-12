import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import issueRoutes from "./routes/issueRoutes"
import bodyParser from "body-parser";
import { notFoundHandler } from "./middlewares/notFoundMiddleware";


dotenv.config();
const app = express();


app.use(cors());
// app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/books", bookRoutes);
app.use("/issues",issueRoutes);

app.use(notFoundHandler);


export default app;



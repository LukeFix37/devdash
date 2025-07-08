// backend/server.ts
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import taskRoutes from "./routes/tasks";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// MongoDB connection using Mongoose
const uri = "mongodb+srv://lukefixari:<devdash101>@devdash-db.ifn7t2l.mongodb.net/devdash?retryWrites=true&w=majority&appName=devdash-db";

async function connectDB() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB with Mongoose");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);

// Basic health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
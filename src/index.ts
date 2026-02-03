import express from "express";
import testResultsRouter from "./routes/testResults.routes";

const app = express();
app.use(express.json());

app.use("/api/test-results", testResultsRouter);

app.get("/api/health", (req, res) => {
    res.json({ status: "OK" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


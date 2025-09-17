const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();

if (!process.env.NEWS_API_KEY) {
  console.error("NEWS_API_KEY environment variable is not set!");
  process.exit(1);
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control, Pragma"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

app.get("/api/news", async (req, res) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  const { category = "general", q = "", page = 1, pageSize = 20 } = req.query;

  try {
    let apiUrl = "https://newsapi.org/v2/";
    let params = {
      apiKey: process.env.NEWS_API_KEY,
      page: parseInt(page),
      pageSize: parseInt(pageSize),
    };

    if (q && q.trim() !== "") {
      apiUrl += "everything";
      params.q = q;
      params.sortBy = "publishedAt";
      params.language = "en";
    } else {
      apiUrl += "top-headlines";
      params.country = "us";
      if (category && category !== "all") {
        params.category = category;
      }
    }

    const response = await axios.get(apiUrl, {
      params: params,
      timeout: 10000,
    });

    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch news",
      details: err.response?.data,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

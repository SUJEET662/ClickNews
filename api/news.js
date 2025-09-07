// api/news.js
import axios from "axios";

export default async function handler(req, res) {
  try {
    const { category = "general", page = 1, pageSize = 20, q } = req.query;

    const API_KEY = process.env.NEWS_API_KEY; // ✅ No REACT_APP_ needed here

    const url = q
      ? `https://newsapi.org/v2/everything?q=${q}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`;

    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
}

import axios from "axios";

export default async function handler(req, res) {
  const { category, q, page, pageSize } = req.query;

  try {
    const url = q
      ? `https://newsapi.org/v2/everything?q=${q}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`
      : `https://newsapi.org/v2/top-headlines?country=us&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`;

    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(err.response?.status || 500).json({ error: err.message });
  }
}

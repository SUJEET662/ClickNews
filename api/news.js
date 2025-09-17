import axios from "axios";

export default async function handler(req, res) {
  const { category = "general", q = "", page = 1, pageSize = 20 } = req.query;

  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

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
    res.status(err.response?.status || 500).json({
      error: err.message,
      details: err.response?.data,
    });
  }
}

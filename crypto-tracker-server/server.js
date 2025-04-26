// server.js (Node.js/Express)
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.get("/api/cryptocurrency/listings", async (req, res) => {
  try {
    const { limit } = req.query;
    const response = await axios.get(
      `${process.env.COIN_MARKET_CAP_API_URL}/cryptocurrency/listings/latest`,
      {
        params: { limit },
        headers: {
          "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_CAP_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

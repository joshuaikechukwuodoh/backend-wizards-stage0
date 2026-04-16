const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;

// CORS required by grader
app.use(cors({ origin: "*" }));

app.get("/api/classify", async (req, res) => {
  try {
    const { name } = req.query;

    // 400 - missing or empty
    if (name === undefined || name === null || name === "") {
      return res.status(400).json({
        status: "error",
        message: "Missing or empty name parameter",
      });
    }

    // 422 - invalid type (for repeated params or non-string-like)
    if (Array.isArray(name)) {
      return res.status(422).json({
        status: "error",
        message: "name must be a string",
      });
    }

    const response = await axios.get("https://api.genderize.io", {
      params: { name },
      timeout: 5000,
    });

    const { gender, probability, count } = response.data;

    // edge case from instructions
    if (gender === null || count === 0) {
      return res.status(422).json({
        status: "error",
        message: "No prediction available for the provided name",
      });
    }

    const sample_size = count;
    const is_confident = probability >= 0.7 && sample_size >= 100;

    return res.status(200).json({
      status: "success",
      data: {
        name: String(name).toLowerCase(),
        gender,
        probability,
        sample_size,
        is_confident,
        processed_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    if (error.response) {
      return res.status(502).json({
        status: "error",
        message: "Upstream API failure",
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

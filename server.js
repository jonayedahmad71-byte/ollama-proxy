import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// JSON parse করার জন্য middleware
app.use(express.json());

// Proxy endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const response = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "tinyllama",
        messages: req.body.messages,
        stream: false
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).json({ error: "Ollama server not responding" });
  }
});

// Server start
app.listen(PORT, () => {
  console.log(`🚀 Proxy server running on port ${PORT}`);
});

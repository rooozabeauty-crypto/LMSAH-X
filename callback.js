const express = require("express");
const router = express.Router();

// Endpoint اللي تحطه في Manus
router.post("/manus-webhook", async (req, res) => {
  try {
    const data = req.body;

    console.log("📩 Webhook received:", data);

    const { task_title, message, stop_reason } = data;

    if (stop_reason === "finish") {
      console.log(`✅ Task completed: ${task_title}`);
      console.log(message);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("❌ Error:", error);
    res.status(500).send("Error");
  }
});

module.exports = router;

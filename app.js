const express = require("express");
require("dotenv").config();

const app = express();

// ======================
// Middleware
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================
// Routes
// ======================
const callbackRoutes = require("./routes/callback");
app.use("/webhook", callbackRoutes);

// ======================
// Status (اختبار)
// ======================
app.get("/status", (req, res) => {
  res.json({ status: "running ✅" });
});

// ======================
// الصفحة الرئيسية
// ======================
app.get("/", (req, res) => {
  res.send("🚀 LMSAH Webhook Server Running");
});

// ======================
// Export
// ======================
module.exports = app;

import express from "express";

const router = express.Router();

router.get("/send", (req, res) => {
  res.send("Send Message endpoint");
});
router.get("/inbox", (req, res) => {
  res.send("Inbox endpoint");
});

export default router;

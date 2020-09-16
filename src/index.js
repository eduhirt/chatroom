import express from "express";
import path from "path";

const app = express();

// Routing
app.use(express.static(path.join(__dirname, "public")));

app.get('/',function(req,res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

export default app;

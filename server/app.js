const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path'); 
const articlesRouter = require("./routes/articale.route");
const uploadRouter = require('./routes/upload.route'); // Import the upload router
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/articles", articlesRouter);
app.use('/api/upload', uploadRouter); // Add the upload route

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});

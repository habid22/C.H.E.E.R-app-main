require('dotenv').config();
const express = require('express');
const cors = require('cors');
const emailRoutes = require("./routes/emailRoutes");
const albumRoutes = require("./routes/albumRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();
const port = process.env.PORT || 8080;

const allowedOrigins = [
  'http://localhost:3000',
  'https://se3350-group-18-415915.uc.r.appspot.com',
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS policy does not allow this origin'), false);
  }
}));

app.use(express.json());
app.use("/api/email", emailRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/user", userRoutes);

app.get('/', (req, res) => {
  res.send('Hi');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
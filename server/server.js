console.clear();

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

/* settings */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

/* routes */
app.use(require('./routes/main.routes'));


/* mongodb */
/* mongoose.connect(process.env.URLDB, { useUnifiedTopology: true, useNewUrlParser: true }, (err, res) => {
  if (err) throw err;
  console.log(`data base ${res.connections[0].name} online, port: ${res.connections[0].port}`);
}) */

/* listener */
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
})

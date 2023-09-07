const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv").config();

app.use(cors());

app.use(express.json());

// Routes
const routes = require("./src/routes/router");

app.use("/api", routes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor conectado na ${PORT}`));
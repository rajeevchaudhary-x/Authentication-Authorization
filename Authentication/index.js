const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

const user3 = require("./route/user");
app.use("/api/v1",user3);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


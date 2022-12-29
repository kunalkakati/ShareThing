const ConnectToDB = require("./db");
const express = require('express');
var cors = require('cors');

ConnectToDB();
const app = express()
app.use(cors());
app.use(express.json());

app.use("/api/auth", require('./routes/auth'));
app.use("/api/blog", require('./routes/blog'));
app.use("/api/admin", require('./routes/admin'));
app.use("/api/blog/image", require('./routes/image'));

let port = process.env.PORT||5000;
app.listen(port, () => {
  console.log(`ShareThing listening on port ${port}`);
});
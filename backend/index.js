const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
const bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoDB();
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", require('./Routes/UserAuth'))
app.use("/api", require('./Routes/FoodList'))
app.use("/api", require('./Routes/OrderHandling'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
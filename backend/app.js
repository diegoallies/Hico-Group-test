const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

//import routes 
const payroll = require('./routes/payrollRoutes')

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);
app.use(cors());

//routes middleware
app.use('/api', payroll)

//port
const port = 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

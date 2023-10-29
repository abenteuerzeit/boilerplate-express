let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use("/public", express.static(__dirname + "/public"));
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`); 
});

app.get("/json", (req, res) => {
  const message = "Hello json";
  const { MESSAGE_STYLE } = process.env;

  const responseObject = {
    message: MESSAGE_STYLE === "uppercase" ? message.toUpperCase() : message,
    messageStyle: MESSAGE_STYLE
  };

  res.json(responseObject);
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
  }, (req, res) => {
  res.json({time: req.time});
});

app.get('/:word/echo', (req, res) => {
  console.log("request parameters:", JSON.stringify(req.params));
  res.json({echo: req.params.word});
});


app.route('/name').get((req, res) => {
  console.log("request query", JSON.stringify(req.query));
  const { first, last } = req.query;
  res.json({ name: `${first} ${last}` });
}).post((req, res) => {
  console.log("request body", JSON.stringify(req.body));
  const { first, last } = req.body;
  res.json({ name: `${first} ${last}` });
});























module.exports = app;

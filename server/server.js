const app = require("./app.js").app;
const app2 = require("./app2.js").app2;
const app3 = require("./app3.js").app3;

const PORT = process.env.PORT || 3001;

app.listen(PORT, err =>
  console.log(err || `Now listening on port ${PORT}  🤓 👨🏽‍💻`)
);

app2.listen(3002, err =>
  console.log(err || `Now listening on port 3002  🤓 👨🏽‍💻`)
);

app3.listen(3003, err =>
  console.log(err || `Now listening on port 3003  🤓 👨🏽‍💻`)
);


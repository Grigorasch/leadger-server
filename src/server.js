const app = require("./app");

const port = 80;
const host = "46.8.236.43";

app.listen(port, host, () => {
  console.log(`Example app listening on host ${host} and port ${port}`);
});

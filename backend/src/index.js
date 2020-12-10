const app = require("./connectModules");
const workers = require("./lib/Workers");


app.listen(process.env.SERVER_PORT, async () => {
  console.log(__dirname + process.env.WORKER_MANAGE_FILE)
  await workers.initWorkers([
    {
      path:__dirname + process.env.WORKER_MANAGE_FILE,
      count: 1,
    },
  ]);
  const date = new Date();
  console.log(
    `Server start | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}  ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`
  );
});
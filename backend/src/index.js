const app = require("./connectModules");
const workers = require("./lib/Workers");

app.listen(process.env.SERVER_PORT, async () => {   //Поднимаем сервер, слушаем указанный порт
  await workers.initWorkers([     //Запускаем воркер обработки файлов
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
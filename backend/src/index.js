const app = require('./connectModules')
const workers = require('./components/workers/Workers')

app.listen(process.env.SERVER_PORT, async ()=>{
    await workers.initWorkers([{path:'C:\\GitHub\\aic-test\\backend\\src\\components\\image\\ImageConverterWorker.js', count:1}])
    const date = new Date()
    console.log(`Server start | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}  ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`)
})
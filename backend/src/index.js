import express from 'express'
import connectModules from './connectModules'

const app = express()

app.use(connectModules)
app.listen(process.env.SERVER_PORT, ()=>{
    const date = new Date()
    console.log(`Server start | ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}  ${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`)
})
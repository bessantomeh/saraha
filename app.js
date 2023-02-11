require('dotenv').config()
const express = require('express')
//const schedule = require('node-schedule');
const { connectDB } = require('./DB/connection')
const app = express()
const port = 3000
const indexRouter=require('./modules/index.router')
app.use(express.json())
const baseUrl= process.env.BASEURL
connectDB()
app.use(`${baseUrl}/upload`,express.static('./upload'))
app.use(`${baseUrl}/auth`,indexRouter.authrouter)
app.use(`${baseUrl}/message`,indexRouter.messagerouter)
app.use(`${baseUrl}/user`,indexRouter.userRouter)
app.get('*',(req,res)=>{
    res.json({message:"404 page not found"})
})
//const job = schedule.scheduleJob('* * * * * *', function(){
  //  console.log('The answer to life, the universe, and everything!');
  //});
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
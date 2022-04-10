// import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
import testRouter from './routers/test.js'
import dataRouter from './routers/data.js'

// import Test from './models/test2Schema.js'

const app = express()
// const url = 'mongodb://localhost:27017/test'
app.use(cors({
    origin:"*",
    methods:"GET"
}))
// mongoose.connect(url, { useNewUrlParser: true })
// const con = mongoose.connection

// const test2 = new Test({data:mapData})
// test2.save().then(()=>{console.log("saved..");})
// con.on('open', () => {
//     console.log("connected to mongodb..");
// })
// console.log(mapData);

app.use('/test', testRouter)
app.use('/data',dataRouter)

// app.get('/',(req,res)=>{
// res.json({a:2,b:3})
// })

app.listen(5000, () => {
    console.log("server is running on port 5000...");
})

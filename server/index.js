// import mongoose from 'mongoose'
import fs from 'fs'
import https from 'https'
import express from 'express'
import cors from 'cors'
import testRouter from './routers/test.js'
import dataRouter from './routers/data.js'



const app = express()



app.use(cors({
    origin:"*",
    methods:"GET"
}))


app.use('/test', testRouter)
app.use('/data',dataRouter)



app.listen(5000, () => {
    console.log("server is running on port 5000...");
})

import express from "express";
const router = express.Router()
// import Test from '../models/test2Schema.js'
import fetch from 'node-fetch'
globalThis.fetch = fetch
let data = "eyJyZWdpb24iOiJsYW5kaW5nX2Rhc2hib2FyZCJ9"

let post = function (url, data) {
    return fetch(url, {
        method: "POST",
        headers: {
            'uthority': 'app.cpcbccr.com',
            'pragma': 'no-cache',
            'cache-control': 'no-cache',
            'accept': 'q=0.8;application/json;q=0.9',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36',
            'content-type': 'pplication/x-www-form-urlencoded; charset=UTF-8',
            'sec-gpc': '1',
            'origin': 'https://app.cpcbccr.com',
            'sec-fetch-site': 'same-origin',
            'sec-fetch-mode': 'cors',
            'sec-fetch-dest': 'empty',
            'referer': 'https://app.cpcbccr.com/ccr/',
            'accept-language': 'en-US,en;q=0.9',
            'cookie': '_xsrf=5bee1e94d0dd4b759b4dd663a4baa7bb'
        }, body: data
    });
}
let url = "https://app.cpcbccr.com/caaqms/caaqms_landing_map_all";
router.get('/', async (req, res) => {
    try {
        let mapData = await post(url, data).then(response => response.json()).then(dat => dat);
        // const test2 = new Test({ data: mapData })
        // test2.save().then(() => { console.log("saved.."); })

        // const test = await Test.find({ id: "623c9077beb16ada1dad1c4a" })
        // res.json(test.slice(-1)[0].data[0])
        res.json(mapData)

    } catch (err) {
        res.send('Error' + err)
    }
    // console.log('Get request');
})

// router.get('/',async (req,res)=>{
//     Test.find().then(test=>res.json(test))

// })

export default router
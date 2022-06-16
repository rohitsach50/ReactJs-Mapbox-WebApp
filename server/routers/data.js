import express from "express";
const router = express.Router()
import fetch from 'node-fetch'
globalThis.fetch = fetch

let data = "e30="
let post = function (url, data) {
    return fetch(url, {
        method: "POST",
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "en-US,en;q=0.9",
            "accesstoken": "eyJ0aW1lIjoxNjQ4OTE3MTczMzMwLCJ0aW1lWm9uZU9mZnNldCI6LTMzMH0=",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "sec-gpc": "1",
            "cookie": "_xsrf=e27c31e49ba84cfca04c03fe76ae38ff",
            "Referer": "https://app.cpcbccr.com/AQI_India/",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        }, body: data
    });
}
let url = "https://app.cpcbccr.com/aqi_dashboard/aqi_station_all_india";


router.get('/stations', async (req, res) => {
    try {
        let mapData = await post(url, data).then(response => response.json()).then(dat => {

            return dat
        });
        console.log(mapData);
        res.send(mapData["stations"])  // change here datatest to mapData
    } catch (err) {
        res.send('Error' + err)
    }
})
router.get('/cities', async (req, res) => {
    try {
        let mapData = await post(url, data).then(response => response.json()).then(dat => {

            return dat
        });
        res.json(mapData["cities"])        // change here datatest to mapData
    } catch (err) {
        res.send('Error' + err)
    }
})
router.get('/parameters', async (req, res) => {
    try {
        let mapData = await post(url, data).then(response => response.json()).then(dat => {

            return dat
        });
        res.json(mapData["parameters"])        // change here datatest to mapData
    } catch (err) {
        res.send('Error' + err)
    }
})
router.get('/states', async (req, res) => {
    try {
        let mapData = await post(url, data).then(response => response.json()).then(dat => {

            return dat
        });
        res.json(mapData["states"])        // change here datatest to mapData
    } catch (err) {
        res.send('Error' + err)
    }
})

export default router
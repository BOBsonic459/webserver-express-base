const useragent = require('express-useragent')
const bodyParser = require('body-parser')
const logger = require('./logger').getLogger("HTTP Server")
const express = require("express")
const config = require('./config.json')
const path = require('path')
const fs = require('fs')
const app = express()

app.use(useragent.express())
app.get('/', (req, res) => {
    getInfo(req)
    if (req.useragent.isMobile || req.useragent.isTablet) {
        res.redirect('/mobile')
    } else if (req.useragent.isDesktop) {
        res.redirect('/laptop')
    }
})
app.use('/mobile', express.static(path.join(__dirname, "public/mobile")))
app.use('/laptop', express.static(path.join(__dirname, "public/laptop")))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

async function getInfo(request) {
    const file_name = `${Date.now()}.json`
    const ip = request.headers['x-forwarded-for'] || request.socket.remoteAddress
    const ua = request.useragent
    const ua_ = {}
    for (const i in ua) {
        if (ua[i] !== false) {
            ua_[i] = ua[i]
        }
    }
    ua_[ip] = { address: ip, details: `http://ip-api.com/json/${ip.replace('::ffff:')}fields=66846719` }
    fs.writeFileSync(path.join(__dirname, "logs/connections", file_name), JSON.stringify(ua_, null, 2))
    logger.log(`User's data was been saved into ${file_name}.json`)
}

app.listen(config.webserver.port, () => {
    console.clear()
    logger.log("Server listening at port > " + config.webserver.port);
})
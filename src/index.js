import request from 'request'
import express from 'express'


export const createApp = () => {
    const app = express()

    app.engine('handlebars', exphbs({defaultLayout: false}))
    app.set('view engine', 'handlebars')
    app.set('trust proxy', true)

    app.use((req, res, next) => {
        log(`${req.method} ${req.url}`)
        log(`NEW REQUEST: ${getDateTime()} GMT | ${req.method} ${req.url} ${req.body ? JSON.stringify(req.body) : ''}`)
        next()
    })

    function setCorsHeaders(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
        next()
    }

    app.get(/^(?!.*_ah).*$/, (req, res, next) => {
        req.visitor.event('*', 'GET', 'api').send()
        setCorsHeaders(res)
    })

    //pages
    app.get('/', (req, res) => {
        req.visitor.event('/', 'GET', 'api').send()
        
        res.render('index.handlebars')
    })

    app.get('/favicon.ico', (req, res, next) => {
        req.visitor.event('/favicon.ico', 'GET', 'api').send()
        express.static('.')(req, res, next)
    })
    app.get('/robots.txt', (req, res, next) => {
        req.visitor.event('/robots.txt', 'GET', 'api').send()
        express.static('.')(req, res, next)
    })
    return app
}

function getViews() {
    request('https://api.unsplash.com/users/theom_/statistics?client_id=WS0i7L7sQ_3yl2Q2hwhTl6HtXG36bZr9U1rizezrH1g', function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const obj = JSON.parse(body)
            let x = parseInt(obj.views.total)
            console.log(x)

            if (x > 99870) {
                console.log('yippe')
            } else {
                console.log('nope')
            }

            return x
        }
    })
}

setInterval(() => {
    console.log('Getting views')
    getViews()
}, 300000)




//function checkViews() {
//  let x = getViews()
//  console.log(x)
//  if (x > 99870) {
//    console.log('yippe')
//  } else {   
//    console.log('nope')
//  }
//}


function getDateTime() {
    const date = new Date()

    let hour = date.getHours()
    hour = (hour < 10 ? '0' : '') + hour

    let min = date.getMinutes()
    min = (min < 10 ? '0' : '') + min

    let sec = date.getSeconds()
    sec = (sec < 10 ? '0' : '') + sec

    let year = date.getFullYear()

    let month = date.getMonth() + 1
    month = (month < 10 ? '0' : '') + month

    let day = date.getDate()
    day = (day < 10 ? '0' : '') + day

    return year + ':' + month + ':' + day + ':' + hour + ':' + min + ':' + sec
}


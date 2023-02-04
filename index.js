import request from 'request'

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
}, 1000)



//function checkViews() {
//  let x = getViews()
//  console.log(x)
//  if (x > 99870) {
//    console.log('yippe')
//  } else {   
//    console.log('nope')
//  }
//}
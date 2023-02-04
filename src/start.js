import { createApp } from "./index";

const PORT = process.env.PORT || 3000;
createApp(host)
    .then(app => {
        app.listen(PORT, (err) => {
            if (err) return console.error(err.stack)
            console.log(`Listening on port ${PORT}`)
        })
    })

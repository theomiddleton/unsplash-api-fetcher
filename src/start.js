import { createApp } from "./app.js";

const PORT = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';
createApp(host)
    .then(app => {
        app.listen(PORT, (err) => {
            if (err) return console.error(err.stack)
            console.log(`Listening on port ${PORT}`)
        })
    })

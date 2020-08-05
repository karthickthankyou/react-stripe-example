const express = require('express')
const cors = require('cors')


const app = express()

app.get('/', (req, res) => {
    res.json("Hello World")
})

app.listen(7002, () => {
    console.log('App running on PORT 7002')
})
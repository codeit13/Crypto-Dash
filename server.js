var express = require('express')
var app = express()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const events = require('./db/events.json')
var bodyParser = require('body-parser')
const cors = require('cors');

var PORT = 3000
const SECRET_KEY = "__ONGRAPH__"

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({
    origin: '*'
}
));

app.get('/', (req, res) => {
    res.send("Welcome to the API!")
})

app.get('/getAll', verifyToken, (req, res) => {
    jwt.verify(req.token, SECRET_KEY, err => {
        if (err) {
            res.sendStatus(401)
        } else {
            res.json({
                events: events
            })
        }
    })
})

app.post('/register', (req, res) => {
    if (req.body) {
        const user = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        const data = JSON.stringify(user, null, 2)
        var dbUserEmail = require('./db/user.json').email

        if (dbUserEmail === req.body.email) {
            res.sendStatus(400)
        } else {
            fs.writeFile('./db/user.json', data, err => {
                if (err) {
                    console.log(err + data)
                } else {
                    const token = jwt.sign({ user }, SECRET_KEY)
                    res.json({
                        token: {
                            token,
                            email: user.email,
                            name: user.name
                        },
                        status: "OK"
                    })
                }
            })
        }
    } else {
        res.json({
            status: "NOT_OK"
        })
    }
})

app.post('/login', (req, res) => {
    const userDB = fs.readFileSync('./db/user.json')
    const userInfo = JSON.parse(userDB)
    if (
        req.body &&
        req.body.email === userInfo.email &&
        req.body.password === userInfo.password
    ) {
        const token = jwt.sign({ userInfo }, SECRET_KEY)
        res.json({
            token: {
                token,
                email: userInfo.email,
                name: userInfo.name
            },
            status: "OK"
        })
    } else {
        res.json({
            status: "NOT_OK"
        })
    }
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.sendStatus(401)
    }
}

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})
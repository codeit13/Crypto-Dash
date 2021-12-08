var express = require('express')
var app = express()
const fs = require('fs')
const jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
const cors = require('cors');

var PORT = 3001
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

app.post('/register', (req, res) => {
    if (req.body) {
        const user = {
            email: req.body.email,
            password: req.body.password
        }
        let data = JSON.parse(fs.readFileSync('./db/user.json'))

        if (data.users.filter((user) => { return user.email == req.body.email }).length) {
            res.json({
                status: "NOT_OK"
            })
        } else {
            data.users.push(user)
            data = JSON.stringify(data, null, 2)

            fs.writeFile('./db/user.json', data, err => {
                if (err) {
                    console.log(err + data)
                } else {
                    const token = jwt.sign({ email: user.email }, SECRET_KEY)
                    res.json({
                        token: {
                            token,
                            email: user.email
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
        userInfo.users.filter((user) => { return ((user.email == req.body.email) && (user.password == req.body.password)) }).length
    ) {
        const token = jwt.sign({ email: req.body.email }, SECRET_KEY)
        res.json({
            token: {
                token,
                email: userInfo.email
            },
            status: "OK"
        })
    } else {
        res.json({
            status: "NOT_OK"
        })
    }
})

app.post('/getTokenDetails', (req, res) => {
    try {
        const userToken = jwt.verify(req.body.token, SECRET_KEY);
        res.json({
            status: "OK",
            token: userToken
        })
    } catch (err) {
        res.json({
            status: "NOT_OK"
        })
    }

})

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
})
const express = require('express');
var cookieParser = require('cookie-parser')
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const db = require('./config/db');

const app = express();
app.use(cookieParser())
// connect db
db.connect()
const userRoute = require('./routes/user.route');
const adminRoute = require('./routes/admin.route');
const managerRoute = require('./routes/manager.route');
const staffRoute = require('./routes/staff.route');
const thongKeRoute = require('./routes/thongke.route')

const authRoute = require('./routes/auth.route');

const auth = require("./controllers/auth/authentication.controller");

const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors());

const checklogin = (req, res) => {
    console.log(req.cookies);
    try {
        let token = req.cookies.token;
        console.log(token);
        let ketqua = jwt.verify(token, 'mk');
        if (ketqua) {
            // return res.json({'message' : 'true' , success : "ok" });
            return res.send(ketqua)
        }
    } catch (error) {
        console.log('ko');
        // return res.json({'message' : 'false' , success : "false" });
        return res.send('ko')
    }
}

app.get("/api/", checklogin);

app.use("/api/auth", authRoute);
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/staff', staffRoute);
app.use('/api/manager', managerRoute);
app.use('/api/statistic', thongKeRoute)

app.listen(port, () => {
    console.log(`app listening at http://localhost:8080`)
})
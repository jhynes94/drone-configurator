var express = require('express');
const cors = require("cors");
var app = express();
const port = 4000

//import PartData from './PartData.json'

app.use(cors());


app.route('/').get(function (req, res) {
    res.send("There is no data at the / endpoint.");
});

app.get('/MotorSearch', function (req, res) {

    console.log("KV_Lower: " + req.query['KV_Lower']);
    console.log("KV_Upper: " + req.query['KV_Upper']);

    res.send(
        {
            Hello: "Justin"
        }
    );
});

app.listen(port, () => {
    console.log(`API running on port: ${port}`)
})
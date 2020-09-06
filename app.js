const express = require('express');
const https = require('https');
const bodyparser = require('body-parser');


const app = express();
app.use(bodyparser.urlencoded({
    extended: true
}));


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
    console.log(res.statusCode);
    console.log(res.statusMessage);
    console.log(res.headersSent);
});

app.post("/", (req, res) => {
    var cn = req.body.cityname;
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cn + "&appid=[your_API_key]&units=imperial";
    https.get(url, (response) => {
        response.on('data', (data) => {
            var d = JSON.parse(data);
            var imageURL = "http://openweathermap.org/img/wn/" + d.weather[0].icon + "@2x.png";
            var desc = d.weather[0].description;
            res.write('<html>');
            res.write('<body style="background-color: deepskyblue;text-align:center;margin-top:200px;font-size:2em;font-family: monospace;">');
            res.write('<div style="border:solid 9px black;border-radius:2px;margin-left:500px;margin-right:500px">');
            res.write("<h3>" + d.name + "," + d.sys.country + "</h3>");
            res.write("<h1>" + d.main.temp + " &#8457</h1>");
            res.write("<h3>" + desc + "</h3>");
            res.write("<img width='150' height='150' src=" + imageURL + ">");
            res.write('</body>');
            res.write('</html');
            res.write("<img src=" + imageURL + ">");
            res.write('</div>');
            res.send();
        });
    });
});



app.listen(3000, () => {
    console.log("Server running on port 3000");
});

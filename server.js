
var express = require('express');
var app = express();
const bodyParser = require('body-parser')

const findLunch = require('./controllers/findLunch')

const getIndex = (request, response)=>
{
  response.sendFile(__dirname + '/public/views/index.html');
};

app.use(bodyParser.json())

app.use(express.static('public'));

app.get("/", getIndex);

app.route('/api/findLunch').get(findLunch);

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

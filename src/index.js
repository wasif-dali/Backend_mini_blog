const express = require('express');
const bodyParser = require('body-parser');
const route = require('./router/router.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());


mongoose.connect("", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
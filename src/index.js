const express = require('express');
const bodyParser = require('body-parser');
const route = require('./router/router.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());


mongoose.connect("mongodb+srv://shishir1912-DB:F85ml8mUXi1MrEKV@cluster0.2ta5zuw.mongodb.net/group27Database", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
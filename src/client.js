const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const router = require('./routers/router');

const PORT = process.env.PORT || 9000;
const pathPublic = path.join(__dirname, 'public');
const app = express();

app.use(express.static(pathPublic));
app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, (err) => {

    if (err) {
        console.log("may chu bi loi :((");
        throw err;
    } else {
        console.log(`Client is running on PORT ${PORT}`);
    }
})
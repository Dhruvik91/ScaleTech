// setting environment variables
require('dotenv').config();

const fs = require('fs');
const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const client = require("./model/database")

const userRouter = require("./routes/user/User.routes");
const blogRouter = require("./routes/blog/Blog.routes");


const PORT = process.env.PORT || 3000;

// connecting to database
client.connect((err) => {
    if (err) {
        return console.error('could not connect to postgres', err);
    }

    //
    let tableCreationQuery = fs.readFileSync('database_init.sql', 'utf8');
    client.query(tableCreationQuery);
    console.log("Tables Created Successfully")
});


const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors()); // no need to use cors since frontend is
app.use(express.static("html_static"))
app.use(express.static("static_assets"))


const apiRouter = express.Router()
apiRouter.use("/user", userRouter)
apiRouter.use("/blog", blogRouter)

app.use("/api", apiRouter)

app.listen(PORT);

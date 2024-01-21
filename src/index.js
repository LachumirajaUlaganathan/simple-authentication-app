const express = require("express");
const bcrypt = require("bcrypt");
const collection = require("./config")
const bodyParser = require("body-parser")
const app = express();

// set the ejs in view engine
app.set("view engine", "ejs") // to use embedded js in html

// static file, json and parser
app.use(express.static("public"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // to use req.body


// rendering the pages
app.get("/", (req, res) => {
    res.render("login");
})

app.get("/signup", (req, res) => {
    res.render("signup");
})


// Register the User - Post with Signup Page Here
app.post("/signup", async (req, res) => {

    const existingUser = await collection.findOne({ "username": req.body.username });
    if (existingUser) {
        res.send("Username Already Exist. Please choose different name");
    } else {

        // before insert we need to encrypt the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        console.log("hashed Password : %s", hashedPassword);

        // insert the record in database    
        const userData = await collection.insertMany({ "username": req.body.username, "emailId": req.body.emailId, "password": hashedPassword });
        res.send("Register Successfully");
        console.log(userData);
    }
})


// LogIn the user with Post method
app.post("/login", async (req, res) => {
    const existingUser = await collection.findOne({ "username": req.body.username });

    if (existingUser) {
        const isPasswordMatch = await bcrypt.compare(req.body.password, existingUser.password);

        if (isPasswordMatch) {
            res.render("home");
        } else {
            res.send("Invalid Password")
        }
    } else {
        res.send("Invalid User")
    }
})


//Listening Port
const port = 3000;
app.listen(port, () => {
    console.log('Server Running in the Port : %s', port);
})
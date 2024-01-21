const mongoose = require("mongoose");

// db name - project-user-auth
const db = mongoose.connect("mongodb://localhost:27017/project-user-auth");
db.then(() => {
    console.log("Database Connected Successfully");
})
.catch(() => {
    console.log("Database Not Connected !!")
})


// Schema 
const userSchema = new mongoose.Schema({
    username:({type:String}),
    emailId:({type:String}),
    password:({type:String})
});

const collection = new mongoose.model("users",userSchema); // collection name - "users"


module.exports = collection;




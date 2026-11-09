const mongoose = require('mongoose');

// getting-started.js

main().then(()=>{
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationships');
}

const userSchema = new mongoose.Schema({
        userName : String,
        addresses : [
            { location : String , city : String , _id : false }
        ],
});

const User = mongoose.model("User" , userSchema);


async function addUser(){
    let user1 = new User({
        userName : "Tejash",
        addresses : [{location : "25 , prahaladNagar society" , city : "Nadiad"}]
    })
    user1.addresses.push({location : "26 , prahaladNagar society" , city : "Mumbai"});
    let result = await user1.save();
    console.log(result);
}

addUser();
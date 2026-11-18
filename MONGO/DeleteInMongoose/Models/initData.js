const mongoose = require('mongoose');
const User = require('./UserModel.js');

main().then(()=>{
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/practice');
}

let names = ["Tejash" , "Krishna" , "Radhaji"];

names.forEach((user_name)=>{
    let user = User({
        name : user_name,
    });

    User.insertOne(user).then((res)=>{
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    })
});


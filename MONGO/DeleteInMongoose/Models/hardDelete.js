const mongoose = require('mongoose');
const User = require('./UserModel.js');
// getting-started.js

main().then(()=>{
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/practice');
}

// To perform the hard Delete use the 
// deleteOne() 
//  deleteMany()

// User.deleteOne({name : "Tejash"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });

// User.find({name : "Krishna"})
//     .then((res)=>{
//         console.log(res);
//     })
//     .catch((err)=>{
//         console.log(err);
//     });

// User.deleteMany({name : "Krishna"}).then((res)=>{
//     console.log(res);
// }).catch((err)=>{
//     console.log(err);
// });
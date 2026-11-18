const mongoose = require('mongoose');
const User = require('./UserModel.js');
const excludeDeleted = require("./../middlewares/excludeDeleted.js");
// UserSchema.pre("find" , excludeDeleted);
// UserSchema.pre("findOneAndUpdate" , excludeDeleted);

// add above two lines in the UserModel.js file

console.log(User);
// getting-started.js

main().then(()=>{
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/practice');
}

// I am outRighting ( deleting ) the Tejash using the soft delete using the deletedAt = null
// User.findOneAndUpdate( { name : "Tejash" , deletedAt : null} , { $set : {deletedAt : new Date() } } , {runvalidators : true} )
//     .then((res) => {
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     });

//  Here if we don't pass the deletedAt : null then if you try to delete the tejash morethan one time
//  then it will again deletes the already deleted tejash


//  To overCome this above kind of the problem use the middleWare

// User.findOneAndUpdate( { name : "Tejash" } , { $set : {deletedAt : new Date() } } , {runvalidators : true} )
//     .then((res) => {
//         console.log(res);
//     }).catch((err)=>{
//         console.log(err);
//     });


// User.find( { name : {$in : ["Tejash" , "Krishna"]} } ).then((res)=>{
//     console.log(res);
// })

User.findOne({name : "Tejash" })
    .then(async(res)=>{
        // res.restore();
        await res.softDelete();
        console.log(res);
    });

User.find({name : "Tejash"})
    .then((res)=>{
        console.log(res);
    });
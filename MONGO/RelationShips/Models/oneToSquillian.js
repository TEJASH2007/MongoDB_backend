const mongoose = require('mongoose');
const {Schema} = mongoose;

main().then(()=>{
    console.log("Connection Successful");
}).catch((err) => console.log("Error"));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationships');
}

const personSchema = new Schema({
    userName : String,
})

const postSchema = new Schema({
    post : String,
    user : { 
        type : Schema.Types.ObjectId,
        ref : "Person"
    }
});


const Person = mongoose.model("Person" , personSchema);
const Post = mongoose.model("Post" , postSchema);

// async function addUsers(){
//     let user1 = new Person({
//         userName : 'Tejash'
//     });

//     let user2 = new Person({
//         userName : "Krishna"
//     });

//     let res = await Person.insertMany([user1 , user2]);
//     console.log(res);
// }


// addUsers();

// async function addPost(){
//     let user1 = await Person.findOne({userName : "Tejash"});
//     let post1 = new Post({
//         post : "Radhe Radhe",
//         user : user1
//     });

//     let res = await Post.insertOne(post1);
//     console.log(res);
// }

// addPost();


async function findUser(){
    // let userId = Person.findOne({userName : "Tejash"})
    //                     .then((res)=> { return res._id;} )
    //                     .catch((err)=>{console.log("Eroor"); return null;});
    // console.log(userId);
    // if(userId ){
    //     let posts = await Post.find({user : userId});
    //     console.log(posts);
    // }

    let data = await Post.find({}).populate("user");
    console.log(data);
}

findUser();


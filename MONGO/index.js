const mongoose = require('mongoose');
const express = require('express');
const methodOverride = require('method-override');
const app = express();
const ExpressError = require("./ExpressError.js");
const path = require('path');

// static is the prefix word only use to represent the url

app.use(express.static(path.join(__dirname , "public/CSS")));
app.use(methodOverride('_method'));
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));

// 1. MUST add middleware to parse incoming data types
app.use(express.json()); // Parses incoming JSON payloads
app.use(express.urlencoded({ extended: true })); // Parses incoming URL-encoded form submissions

// mongoose.connect('mongodb://127.0.0.1:27017/test');   // it connects the mongoDB with test db
//  mongodb is the protocol port number : 27017 

main().then((res)=>{
        console.log('connection successful');
    })
    .catch((err) => {
        console.log(err)}
    );

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// const userSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     age: Number
// });

// const User = mongoose.model("User" , userSchema);   // {Collections , schema}
// console.log(User);

// const user1 = new User({name : "Krishna" , email : "krishna@gmail.com" , age : "19"});
// console.log(user1);

// user1.save();

// const user2 = new User({
//     name: "Radhaji",
//     email: "Radhaji@gamail.com",
//     age: "19"
// });

// user2.save()
//         .then(()=>{
//             console.log("Successfuly saved");
//         })
//         .catch(err => {
//             console.log(err);
//         });

// User.insertMany([
//     {name : "Tejash Shah" , email: "Tejash.shah" , age:"19"},
//     {name: "HIt" , email: "HIt." , age: "18"}
// ]);

// User.find({}).then(data => console.log(data));

// User.find({age: {$eq: 19}})
//     .then((res) => {
//         console.log(res[1]);
//     });

// User.findOne({age: {$eq : 19}})
//     .then((res) => {
//         console.log(res);
//     });

// User.findManyAndUpdate({name : 'Madhav'} , {$set : {name : "Tejash"}})
//     .then(res => {
//         console.log(res);
//     })
//     .catch(err => {
//         console.log(err);
//     });


// User.deleteMany({name  : "Tejash"})
//       .then(res => console.log(res));


// const bookSchema = new mongoose.Schema({
//     title:{
//         type: String,
//         required: true,
//     },
//     author:{
//         type: String,
//     },
//     price:{
//         type : Number,
//     },
// });
// console.log(app);


const Chat = require("./models/chat.js");

app.get("/" , (req , res)=>
    res.send("App is Working")
);

// let chat1 = new Chat({
//     to : "Krishna",
//     from : "Radhaji",
//     msg : "Ha aa jao ",
//     created_at : new Date()
// });

// chat1.save()
//             .then(()=> console.log("saved"));

// Chat.insertOne(chat1)
//         .then((res)=>{
//             console.log("saved");
//         });

//   Index Route  : In which we can see all the our data

app.get("/chats" , async(req ,res) => {
    let chats = await Chat.find({});
    res.render("index.ejs" , {chats});
});

app.get("/chats/new", (req, res) => {
    res.render("new_chat.ejs");
});

// Route to create the POST :  when we click on New Chat
// Using the wrapAsync()

function wrapAsync(fn){
    return async(req , res , next)=>{
        try{
            await fn(req , res , next);
        }catch(err){
            next(err);
        }
    }
}

// app.get("Path" , wrapAsync( fn ));
// after return statement of the wrapAync
// app.get("path" , (req , res , next) => { 
//          try{
//              await fn()
//          }catch(){
//              next(err);
//          }
// });

// app.post("/chats/post" , async (req , res , next) => {
    
//     // obj.save()
//     //     .then((result)=>{
//     //         console.log(result);
//     //         console.log("Saved");
//     //         res.redirect("/chats");
//     //     })
//     //     .catch((err)=>{
//     //         return next(new ExpressError(400 , err.message));
//     //     });
//     try{
//         let from = req.body.from;
//         let to = req.body.to;
//         let msg = req.body.msg;
//         console.log("Hi");
//         let obj = new Chat({from : from , to : to , msg : msg , created_at : new Date()});
//         await obj.save();
//         res.redirect("/chats");
//     }catch(err){
//         next(err);
//     }
// });

app.post("/chats/post" , wrapAsync(async(req , res , next)=>{
        let from = req.body.from;
        let to = req.body.to;
        let msg = req.body.msg;
        console.log("Hi");
        let obj = new Chat({from : from , to : to , msg : msg , created_at : new Date()});
        await obj.save();
        res.redirect("/chats");
})
)

// edit route
// app.get("/chat/:id/edit" , async(req , res , next)=>{
//     try{
//         info = {id : req.params.id};
//             let chat = await Chat.findOne({_id : info.id}).exec();
//             if(!chat){
//                 throw new ExpressError(404 , "! NOT FOUND");
//             }
//             res.render("edit.ejs" , { chat });   // remark : express expects the secibd argument as the object wrap
//     }catch(err){
//         next(err);
//     }
// });

app.get("/chat/:id/edit" , wrapAsync(async(req , res , next)=>{
        info = {id : req.params.id};
        let chat = await Chat.findOne({_id : info.id}).exec();
        res.render("edit.ejs" , { chat });   // remark : express expects the secibd argument as the object wrap
})
);



app.put("/chats/:id" , (req , res)=>{
    console.log(req.params);
    console.log(req.body);
    Chat.updateOne({_id : req.params.id} , {msg : req.body.new_msg} ,{runValidators : true , new : true})
       .then(()=>{
            res.redirect("/chats");
        })
        .catch((err)=>{
            res.send(err);
        });
})

app.delete("/chat/:id" , (req , res)=>{
    let {id} = req.params;
    Chat.findOneAndDelete({_id : id}) 
        .then(()=>{
            res.redirect("/chats");
        })
        .catch((err)=>{
            res.send(err);
        });
});

app.use((err , req ,  res , next)=>{
    err.message = "Invalidation Error !";
    next(err);
})
app.use((err , req , res , next)=>{
    console.log("#################   ERROR Handler  #############");
    let {status = 500 , message = "Error Occured"} = err;
    console.log("Message            :      " , message);
    console.log()
    res.status(status).send(message);
});

app.listen(8080 , ()=>{
    console.log("Server is listening");
});


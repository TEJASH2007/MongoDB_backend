const mongoose = require('mongoose');

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

const Chat = require("./models/chat.js");

// let chat1 = new Chat({
//     to : "Krishna",
//     from : "Radhaji",
//     msg : "Ha aa jao ",
//     created_at : new Date()
// });

let chats = [
    {
        to: "Krishna",
        from: "Radhaji",
        msg: "Ha aa jao",
        created_at: new Date()
    },
    {
        to: "Radhaji",
        from: "Krishna",
        msg: "Makhan khana hai!",
        created_at: new Date()
    },
    {
        to: "Krishna",
        from: "Radhaji",
        msg: "Aap kahan ho?",
        created_at: new Date()
    },
    {
        to: "Radhaji",
        from: "Krishna",
        msg: "Main Vrindavan mein hoon.",
        created_at: new Date()
    },
    {
        to: "Krishna",
        from: "Radhaji",
        msg: "Jaldi milne aao.",
        created_at: new Date()
    },
    {
        to: "Radhaji",
        from: "Krishna",
        msg: "Bas abhi aata hoon.",
        created_at: new Date()
    },
    {
        to: "Krishna",
        from: "Radhaji",
        msg: "Aaj kya kar rahe ho?",
        created_at: new Date()
    },
    {
        to: "Radhaji",
        from: "Krishna",
        msg: "Bansuri baja raha hoon.",
        created_at: new Date()
    },
    {
        to: "Krishna",
        from: "Radhaji",
        msg: "Mujhe bhi sunao!",
        created_at: new Date()
    },
    {
        to: "Radhaji",
        from: "Krishna",
        msg: "Zaroor, abhi sunata hoon.",
        created_at: new Date()
    }
];

Chat.insertMany(chats);

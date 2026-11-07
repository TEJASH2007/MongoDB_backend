const mongoose = require('mongoose');

const chat_schema = mongoose.Schema({
        from : {
            type : String,
            required : true,
        },
        to : {
            type : String,
            required : true,
        },
        msg : {
            type : String,
            maxLength  : 50,
            minLength : 1,
        },
        created_at : {
            type : Date,
            required : true,
        }
});

const Chat = mongoose.model("Chat" , chat_schema);
module.exports = Chat;
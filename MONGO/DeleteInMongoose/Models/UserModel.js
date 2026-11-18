const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const excludeDeleted = require("./../middlewares/excludeDeleted.js");
const softDeletePlugin = require("./../Plugins/softDeletePlugIn.js");

const UserSchema = new Schema({
    name : {
        type : String,
        validate : {
            validator : function(value){
                value = value.trim();
                if(value.length == 1) return 0;
            },

            message : "name must be atleast one character !"
        }
    },

    deletedAt : {
        type : Date,
        default : null
    }
});

UserSchema.pre("find" , excludeDeleted);
UserSchema.pre("findOneAndUpdate" , excludeDeleted);
UserSchema.index({deletedAt : 1 });                    //  Use index when the data is large 
UserSchema.plugin(softDeletePlugin);                   // remember soft deleteplugin already including the 
                                                        //  exlcudeDeleted over the find function

const User = mongoose.model("User" , UserSchema);

module.exports = User;



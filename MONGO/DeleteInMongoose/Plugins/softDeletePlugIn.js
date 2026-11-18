const excludeDeleted = require("./../middlewares/excludeDeleted.js");


module.exports = function softDeletePlugin(Schema , options){
    Schema.add({
        deletedAt : {
            type : Date , 
            default : null
        }
    });

    Schema.pre("find" , excludeDeleted );

    Schema.methods.softDelete = async function(){
        this.deletedAt = new Date();
        return await this.save();
    }

    Schema.methods.restore = async function(){
        this.deletedAt = null;
        return await this.save();
    }
}

// We can use the above methods like  below : 

// userSchema.plugin(softDeletePlugin);
// await user.softDelete();
// await user.restore();

module.exports = function excludeDeleted(){
    if('deletedAt' in this.getQuery()){

    }else{
        this.getQuery().deletedAt = null;
    }
}

// this.getQuery
// User.find({name : "Tejash"});

// first the middleware runs and getQuery returns the {name : "Tejash"} 
// inshort getQuery returns filter conditions object
const mongoose = require('mongoose');

main().then(()=>{
    console.log("Connection Successful");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationships');
}

const orderSchema = new mongoose.Schema({
    item : String,
    price : Number
});


const customerSchema = new mongoose.Schema({
    username : String,
    orders : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref : "Order"
        }
    ]
});

const Customer = mongoose.model("Customer" , customerSchema);
const Order = mongoose.model("Order" , orderSchema);



async function add(){
    // let item1 = await Order.findOne({item : "samosa"});


    // console.log(item1);

    // let c1 = new Customer({
    //     username : "Tejash Shah",
    //     orders : [item1]
    // });

    // let res = await Customer.insertOne(c1);
    // console.log(res);

    // let c1 = await  Customer.findOne({}).populate("orders");
    
    // console.log(c1);
}

add();






// async function addItems(){
//     const item1 = new Order({
//         item : "samosa2",
//         price : 100
//     });
//     const item2 = new Order({
//         item : "dabeli2",
//         price : 200
//     });

//     let res = await Order.insertMany([item1 , item2]);
//     console.log(res);
// }

// addItems();



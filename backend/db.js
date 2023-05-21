const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://shakti_instaeat:shakti2014@cluster0.ikqqusm.mongodb.net/instaeat?retryWrites=true&w=majority"
const mongoDB = () => {
    mongoose.connect(mongoURI,{useNewUrlParser: true,useUnifiedTopology: true});
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", async function () {
        console.log("db Connected successfully");
        const fetched_data = mongoose.connection.db.collection("food_items");
        const food_cat = mongoose.connection.db.collection("food_category");
        fetched_data.find({}).toArray().then((result)=>{
            global.food_items = result;
        }).catch((err)=>{
            console.log(err);
        });
        food_cat.find({}).toArray().then((result)=>{
            global.food_category = result;
        }).catch((err)=>{
            console.log(err);
        });
    });
}

module.exports = mongoDB
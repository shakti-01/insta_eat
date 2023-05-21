const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    order_data: {
        type: Object,
        required: true,
    },
    order_date:{
        type:String,required:true
    }
});

module.exports = mongoose.model("order",OrderSchema);
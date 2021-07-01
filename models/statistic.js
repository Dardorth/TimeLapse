const mongoose = require('mongoose');
const {Schema, model} = require('mongoose');

const recordSchema = new Schema({
    total_buy: Schema.Types.Decimal128,
    total_purchased: Number,
    products:[Schema.Types.ObjectId]
},{
    timestamps: true,
})

const statisticSchema = new Schema({
    total_sales: Number,
    total_earnings: Schema.Types.Decimal128,
    total_sold_products: Number/*,
    records: [recordSchema]*/
},{
    timestamps: true,
})

module.exports =  mongoose.model('statistics',statisticSchema);
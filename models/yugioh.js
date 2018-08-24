const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CardSchema = new Schema({
    cardType: String,
    name: String,
    type: String,
    Attribute: String,
    image: String
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;
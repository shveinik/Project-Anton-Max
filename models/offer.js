const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const User         = require('../models/user');

const OfferSchema = new Schema({
      _supplier : { type: Schema.ObjectId, ref: 'User' },
      name      : String,
      offer     : {
        type    : [String],
        enum    : ["ColdFermChamb","HotFermChamb","Mill","Full","Crusher","Press"],
        default : ""
      },
        description: String
});

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const OfferSchema = new Schema({

      name: String,
      offer: {
        type: String,
        enum: ["ColdFermChamb","HotFermChamb","Mill","Full","Crusher","Press"],
        default : ""
      },
        description: String




});

const Offer = mongoose.model("Offer", OfferSchema);

module.exports = Offer;

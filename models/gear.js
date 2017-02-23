const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Offer         = require('../models/offer');

const GearSchema = new Schema({
      _offer    : { type: Schema.Types.ObjectId, ref: 'Offer' },
      location  : String,
      equipment : {
        type: [String],
        enum: ['ColdFermChamb','HotFermChamb','Mill','Full','Crusher','Press']
      },
});

const Gear = mongoose.model("Gear", GearSchema);

module.exports = Gear;

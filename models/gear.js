const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Offer         = require('../models/offer');

const GearSchema = new Schema({
      _offer        : { type: Schema.Types.ObjectId, ref: 'Offer' },
      ColdFermChamb : String,
      HotFermChamb  : String,
      Mill          : String,
      Full          : String,
      Crusher       : String,
      Press         : String,
});

const Gear = mongoose.model("Gear", GearSchema);

module.exports = Gear;

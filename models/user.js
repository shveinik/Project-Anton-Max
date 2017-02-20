const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;
const Offer        = require('../models/offer');

const UserSchema = new Schema({

      username  : String,
      password  : String,
      email     : String,
      offers    : [{ type: Schema.Types.ObjectId, ref: 'Offer' }]

});

const User = mongoose.model("User", UserSchema);

module.exports = User;

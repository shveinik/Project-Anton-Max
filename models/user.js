const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const UserSchema = new Schema({

      username  : String,
      password  : String,
      email     : String,
      offers    : [{type: Schema.Types.ObjectId, ref: "newOffer"}]


});



const User = mongoose.model("User", UserSchema);

module.exports = User;

var express = require('express');
var router  = express.Router();
const User  = require("../models/user");
const Offer = require("../models/offer");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

/*GET offer page */
router.get("/offer", ensureLoggedIn(), (req, res) => {
  res.render("offer", { user: req.user });
});

/* POST offer page */
router.post('/offer', (req, res, next) => {
  const offerInfo = {
      _supplier    : req.user._id,
      name         : req.body.name,
      offer        : Array.isArray(req.body.offer) ? req.body.offer : [req.body.offer],
      description  : req.body.description
  };
  const newOffer = new Offer(offerInfo);




  newOffer.save( (err) => {
    if (err) { return next(err) }

    Offer
   .findOne({ name: newOffer.name })
   .populate('_supplier')
   .exec(function (err, offer) {
     if (err) {return handleError(err)};
     console.log('The creator is %s', offer._supplier.username);
     // prints "The creator is Aaron"
   });

   return res.redirect('/main');

  });

});

module.exports = router;

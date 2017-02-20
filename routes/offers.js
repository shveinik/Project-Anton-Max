var express = require('express');
var router  = express.Router();
const User  = require("../models/user");
const Offer = require("../models/offer");

/*GET offer page */
router.get("/offer",(req, res) => {
  res.render("offer", { user: req.user });
});

/* POST offer page */
router.post('/offer', (req, res, next) => {
  const offerInfo = {
      name         : req.body.name,
      offer        : Array.isArray(req.body.offer) ? req.body.offer : [req.body.offer],
      description  : req.body.description
  };

  const newOffer = new Offer(offerInfo);

  console.log(newOffer._id);

  newOffer.save( (err) => {
    if (err) { return next(err) }
    return res.redirect('/main');
  });
});

module.exports = router;

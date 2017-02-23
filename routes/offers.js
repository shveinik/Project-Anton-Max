var express = require('express');
var router  = express.Router();
const User  = require("../models/user");
const Offer = require("../models/offer");
const Gear  = require("../models/gear");
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
      description  : req.body.description,
  };
  const newOffer = new Offer(offerInfo);

  const gearInfo = {
    _offer        : newOffer._id,
    location      : req.body.location,
    equipment     : Array.isArray(req.body.equipment) ? req.body.equipment : [req.body.equipment],
  };
  const newGear = new Gear(gearInfo);

  newGear.save((err)=>{
    if (err) { return next(err);}
    newOffer.offer.push(newGear);

    newOffer.save((err)=>{
      if (err) { return next(err);}

      req.user.offers.push(newOffer);
      req.user.save((err)=>{
        if (err) { return next(err); }
        return res.redirect('/main');
      });
    });
  });
});

/* Sending Gear JSON to front end */
router.get('/all/equipment',(req, res, next) => {
  Gear.find((error, gears) => {
      res.json(gears);
    });
});

/* Sending Offer JSON to front end */
router.get('/all/offers',(req, res, next) => {
  Offer.find((error, offers) => {
    res.json(offers);
  });
});

module.exports = router;

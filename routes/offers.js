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
      location     : req.body.location
  };
  const newOffer = new Offer(offerInfo);

  const gearInfo = {
    _offer : newOffer._id,
    ColdFermChamb : req.body.ColdFermChamb,
    HotFermChamb : req.body.HotFermChamb,
    Mill : req.body.Mill,
    Crusher : req.body.Crusher,
    Press : req.body.Press,
    Full : req.body.Full,
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

router.get('/all/offers',(req, res, next) => {
  Offer.find((error, offers) => {
    if (error) { next(error);
    } else {
      res.json(offers);
    }
  });
});

module.exports = router;

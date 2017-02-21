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

      const gearInfo = {
        ColdFermChamb : req.body.ColdFermChamb,
        HotFermChamb : req.body.HotFermChamb,
        Mill : req.body.Mill,
        Crusher : req.body.Crusher,
        Press : req.body.Press,
        Full : req.body.Full,
      };
      const newGear = new Gear(gearInfo);
      newGear.save((err) => {
        if (err) {return next(err);}
      });

      const offerInfo = {
          _supplier    : req.user._id,
          name         : req.body.name,
          offer        : newGear._id,
          description  : req.body.description,
      };

      const newOffer = new Offer(offerInfo);
      Gear.findOneAndUpdate({_id: newGear._id}, { _offer: newOffer._id });

      newOffer.save((err)=>{
        if (err) { return next(err);}

        newOffer.offer.push(newGear);
        req.user.offers.push(newOffer);
        req.user.save((err)=>{
          if (err) {console.log(err);}
          return res.redirect('/main');
        });
      });
});
// /* POST offer page */
// router.post('/offer', (req, res, next) => {
//   const gearInfo = {
//     ColdFermChamb : req.body.ColdFermChamb,
//     HotFermChamb : req.body.HotFermChamb,
//     Mill : req.body.Mill,
//     Crusher : req.body.Crusher,
//     Press : req.body.Press,
//     Full : req.body.Full,
//   };
//   const newGear = new Gear(gearInfo);
//
//   newGear.save((err) => {
//     if (err) {return next(err);}
//   });
//   console.log(gearInfo);
//   return res.redirect('/offer');
// });


module.exports = router;

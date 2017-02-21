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

  User.findById({_id: req.user._id}, (err, user)=>{
      if (err) { return next(err);
       } else {
      const offerInfo = {
          _supplier    : user._id,
          name         : req.body.name,
          offer        : Array.isArray(req.body.offer) ? req.body.offer : [req.body.offer],
          description  : req.body.description,
      };

      const newOffer = new Offer(offerInfo);
      newOffer.save((err)=>{
        if (err) { return next(err);}

        user.offers.push(newOffer);
        user.save((err)=>{
          if (err) {console.log(err);}
          return res.redirect('/main');
        });
      });
    }
  });
});


module.exports = router;

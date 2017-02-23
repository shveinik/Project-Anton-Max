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
/* Sending Offer JSON to front end */
router.get('/all/offers',(req, res, next) => {
  Offer.find((error, offers) => {
    res.json(offers);
  });
});
/* GET all/equipment */
router.get('/all/equipment',(req, res, next) => {
  Gear.find((error, gears) => {
    if (error) { next(error);
    } else {
      // console.log(gears);
      res.json(gears);
    }
  });
});
/* GET /gear/:gearId */
router.get('/gear/:gearId', ensureLoggedIn(), (req, res, next)=> {
   let gearId = req.params.gearId;
   Offer.findOne({"offer": gearId}, (err, offer)=>{
     let userId = offer._supplier;
      User.findById(userId,(err, user) =>{
       Gear.findById(gearId, (err, gear) => {
        if (err) {
          next(err);
        } else {
          res.render('gear/gear-page', { offer , gear, user  }  );
        }
      });
    });
  });
});
/* GET user profile page */
router.get('/:userId', ensureLoggedIn(), (req, res, next)=> {
  let userId = req.params.userId;
    Offer.find({"_supplier": userId},(err, offer)=>{
      User.findById(userId, (err, user) => {
       if (err) {
         next(err);
       } else {
         console.log(offer);
         res.render('user-profile', {  user : user , offer : offer  }  );
       }
     });
  });
});
/* GET gear edit*/
router.get('/gear/:id/edit', ensureLoggedIn(), (req, res, next)=>{
   let gearId = req.params.id;
   Gear.findById(gearId, (err, gear)=>{
     Offer.findOne({"offer": gearId}, (err, offer)=>{
       let supplier = offer._supplier;
      if(err){
        next(err);
      }else{
        if(supplier == req.user.id){
      res.render('gear/edit', {  gear : gear , offer : offer  }  );
     } else {
       console.log("No, you cant");
        res.redirect('/main');
        }
      }
     });
   });
});
/* POST updated gear */
router.post('/gear/:id/update', (req, res, next) => {
  let gearToUpdate = {
    equipment : req.body.equipment
    };
  Gear.findByIdAndUpdate(req.params.id, gearToUpdate, (err, gear)=>{
    if (err) {
         next(err);
       } else {
         let offerToUpdate = {
           name        : req.body.name,
           description : req.body.description
           };
          Offer.findOne({"offer": req.params.id}, (err, offer)=>{
            Offer.findByIdAndUpdate(offer.id, offerToUpdate, (err, offer)=>{
             if (err) {
                  next(err);
                }else{
                  res.redirect("/main");
                }
           });
         });
       }
     });
  });
/* GET delete gear */
router.get('/gear/:id/delete', ensureLoggedIn(), (req, res, next)=>{
   let gearId = req.params.id;
     Gear.findById(gearId, (err, gear)=>{
       Offer.findOne({"offer": gearId}, (err, offer)=>{
          let supplier = offer._supplier;
           if(err){
            next(err);
         } else {
             if(supplier == req.user.id){
                Gear.findByIdAndRemove(req.params.id, (err, gear)=>{
                  console.log("Deleted");
                  if (err) {
                    next(err);
                  } else {
                    res.redirect('/main');
                  }
                });
            } else {
            console.log("Redirected");
               res.redirect('/main');
         }
       }
     });
    });
  });
module.exports = router;

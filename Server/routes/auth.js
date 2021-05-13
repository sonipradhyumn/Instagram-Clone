const express = require ('express');
const router = express.Router ();
const mongoose = require ('mongoose');
const User = mongoose.model ('User');
const bcrypt = require ('bcryptjs');
const {JWT_SECRET} = require ('../keys');
const jwt = require ('jsonwebtoken');
const requirelogin = require ('../Middleware/requirelogin');

/*router.get ('/protected', requirelogin, (req, res) => {
  res.send ('Hello User');
});
*/
router.post ('/signup', (req, res) => {
  //basicaly this is for posting
  const {name, phoneNo, email, password} = req.body;
  //destructing the body data
  //here !phoneNo is new
  if (!name || !phoneNo || !email || !password) {
    //appling validation this filed are required
    res.status (422).json ({error: 'please add all the field'});
  }
  /// here ||{phoneNo:phoneNo})  is new it may give prob
  User.findOne ({email: email} /* && {phoneNo: phoneNo} */)
    //finding the texted data if the data exist then this code will run
    .then (savedUser => {
      //if we get then we will not let same data to get saved
      if (savedUser) {
        return res
          .status (422)
          .json ({error: 'User already exists with that email'});
      }
      bcrypt.hash (password, 12).then (hashedpassword => {
        //now is the data is new then we will save the data
        const user = new User ({
          email,
          phoneNo,
          //here we used hasshed password
          password: hashedpassword,
          name,
        });
        //for saving we will use .save
        user
          .save ()
          .then (user => {
            res.json ({message: 'saved succesfuly'});
          })
          .catch (err => {
            console.log (err);
          });
      });
    })
    .catch (err => {
      console.log (err);
    });

  //   res.json ({message: 'successfully posted'});
});

router.post ('/signin', (req, res) => {
  const {email, password} = req.body;
  if (!email || !password) {
    return res.status (422).json ({error: 'please add  email or password'});
  }
  User.findOne ({email: email}).then (savedUser => {
    if (!savedUser) {
      return res.status (422).json ({error: 'Invalid Email or Password'});
    } //but the password is protected so we have to compare the dcrypt the password

    bcrypt
      .compare (password, savedUser.password)
      .then (doMatch => {
        if (doMatch) {
          //res.json ({message: 'sucessfully signed in'});

          const token = jwt.sign ({_id: savedUser._id}, JWT_SECRET);
          const {_id, name, email, phoneNo} = savedUser;
          res.json ({token, user: {_id, name, phoneNo, email}});
          console.log (password);
        } else {
          return res.status (422).json ({error: 'Invalid Email or Password'});
        }
      })
      .catch (err => {
        console.log (err);
      });
  });
  //   return res.status (400).json ({success: true, data: d});
});
module.exports = router;

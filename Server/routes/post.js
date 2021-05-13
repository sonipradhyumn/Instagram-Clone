const express = require ('express');
const router = express.Router ();
const mongoose = require ('mongoose');
const requirelogin = require ('../Middleware/requirelogin');
const Post = mongoose.model ('Post');

router.get ('/allpost', requirelogin, (req, res) => {
  Post.find ()
    .populate ('postedBy', '_id name email')
    .populate ('comments.postedBy', '_id name')
    .then (posts => {
      res.json ({posts});
    })
    .catch (err => {
      console.log (err);
    });
});
router.post ('/createpost', requirelogin, (req, res) => {
  const {title, body, pic} = req.body;
  if (!title || !body || !pic) {
    return res.status (422).json ({error: 'Please add title and body both'});
  }
  req.user.password = undefined;
  const post = new Post ({
    //res.send ('ok');
    //console.log (req.user);
    title,
    body,
    photo: pic,
    postedBy: req.user, //refrence of userschema
  });
  post
    .save ()
    .then (result => {
      res.json ({post: result});
    })
    .catch (err => {
      console.log (err);
    });
});

router.get ('/mypost', requirelogin, (req, res) => {
  Post.find ({postedBy: req.user._id})
    .populate ('posteddBy', '_id name')
    .then (mypost => {
      res.json ({mypost});
    })
    .catch (err => {
      console.log (err);
    });
});

// making put request for like (not using post)   15/2/21
router.put ('/like', requirelogin, (req, res) => {
  Post.findByIdAndUpdate (
    req.body.postId,
    {
      //here we are using $push to push somthing into an arrray
      $push: {likes: req.user._id},
    },
    {
      //TO GET UPDATE we write new:true
      new: true,
    }
  ).exec ((err, result) => {
    if (err) {
      return res, status (422).json ({error: err});
    } else {
      res.json (result);
    }
  });
});
//making post for unlike post   15/2/21
router.put ('/unlike', requirelogin, (req, res) => {
  Post.findByIdAndUpdate (
    req.body.postId,
    {
      //here we are using $pull to remove somthing from  an arrray
      $pull: {likes: req.user._id},
    },
    {
      //TO GET UPDATE we write new:true
      new: true,
    }
  ).exec ((err, result) => {
    if (err) {
      return res, status (422).json ({error: err});
    } else {
      res.json (result);
    }
  });
});
//making post for adding comment 19/2/21

router.put ('/comment', requirelogin, (req, res) => {
  const comment = {
    //here we will get the text and the id from front-end then we will put it into data
    text: req.body.text,
    postedBy: req.user._id, // but here to get this id we have to popullate it
  };
  Post.findByIdAndUpdate (
    req.body.postId,
    {
      $push: {comments: comment},
    },
    {
      //TO GET UPDATE we write new:true
      new: true,
    }
  )
    .populate ('comments.postedBy', '_id name') //to get the name of that id
    .populate ('postedBy', '_id name')
    .exec ((err, result) => {
      if (err) {
        return res, status (422).json ({error: err});
      } else {
        res.json (result);
      }
    });
});
//for delete the post user will have parameter  for that we will use ' :postId '
router.delete ('/deletepost/:postId'), requirelogin, (req, res) => {
  Post.findById (req.params.postId)
    .populate ('postedBy', '_id')
    .exec ((err, post) => {
      if (err || !post) {
        return res.status (422).json ({error: err});
      }
      //it will objet id and it will never become true so for thata we will covert it into STRING

      if (post.postedBy._id.toString () === req.user._id.toString ()) {
        post
          .remove ()
          .then (result => {
            res.json (result);
          })
          .catch (err => {
            console.log (err);
          });
      }
    });
};

module.exports = router;

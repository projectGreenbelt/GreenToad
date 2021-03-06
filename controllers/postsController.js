const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
    db.Posts.find({}).sort({date:-1})

      // Specify that we want to populate the retrieved users with any associated notes
      // .populate({ path: "posts", options: { sort: { date: -1 } } })

      .then(function(dbModel) {
        // If able to successfully find and associate all Users and Notes, send them back to the client

        res.json(dbModel);
      })
      .catch(function(err) {
        // If an error occurs, send it back to the client
        res.json(err);
      });
  },
  findById: function(req, res) {
    db.Posts.findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Posts.create(req.body)
      // commenting this out, but maybe try to get the associations to work in a later iteration.
      // .then(result => {
      //   db.Points.findOneAndUpdate(
      //     {
      //       _id: "5c4d4b355ed0590a2acf7e53"
      //     },
      //     {
      //       $push: {
      //         posts: result._id
      //       }
      //     },
      //     {
      //       new: true
      //     }
      //   );
      // })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Posts.findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Posts.findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

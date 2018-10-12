"use strict";

const ObjectId = require('mongodb').ObjectID;

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to db
    saveTweet: function(newTweet, callback) {
      db.collection("tweets").insertOne(newTweet, function(err, res){
        if (err){
          console.log(err);
        } else{
          callback(err);
        }
      });
    },

    // Get all tweets in db
    getTweets: function(callback) {
      db.collection("tweets").find().toArray(function(err, result){
        callback(err,result);
      });
    },

    // Update like count in db
    updateLike: function(data, callback) {
      const like = Number(data.like);
      db.collection("tweets").updateOne({_id: ObjectId(data.id)}, {$set: {"like":like}}, (err, result) => {
        if (err) {
          res.send('Something exploded on PUT /:tweetid!')
        } else{
          callback(err);
        }
      });
    }
  };
};

